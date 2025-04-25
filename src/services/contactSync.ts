import { supabase } from '../lib/supabase';
import type { Contact } from '../lib/supabase';

interface GoogleContact {
  resourceName: string;
  names?: Array<{
    displayName: string;
  }>;
  emailAddresses?: Array<{
    value: string;
  }>;
  phoneNumbers?: Array<{
    value: string;
  }>;
  organizations?: Array<{
    title?: string;
    name?: string;
  }>;
  photos?: Array<{
    url: string;
  }>;
}

export async function syncGoogleContacts() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) throw new Error('No active session');

    const provider = session.user.app_metadata.provider;
    if (provider !== 'google') {
      throw new Error('Must be signed in with Google to sync contacts');
    }

    const { provider_token } = session;
    if (!provider_token) {
      throw new Error('No provider token available');
    }

    // Fetch Google contacts
    const response = await fetch(
      'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations,photos',
      {
        headers: {
          Authorization: `Bearer ${provider_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Google contacts');
    }

    const data = await response.json();
    const contacts: GoogleContact[] = data.connections || [];

    // Transform and upsert contacts
    const transformedContacts = contacts.map((contact): Partial<Contact> => ({
      user_id: session.user.id,
      name: contact.names?.[0]?.displayName || 'Sin nombre',
      email: contact.emailAddresses?.[0]?.value,
      phone: contact.phoneNumbers?.[0]?.value,
      role: contact.organizations?.[0]?.title,
      discipline: contact.organizations?.[0]?.name,
      image_url: contact.photos?.[0]?.url,
      provider: 'google',
      provider_id: contact.resourceName,
    }));

    // Upsert contacts in batches
    const batchSize = 100;
    for (let i = 0; i < transformedContacts.length; i += batchSize) {
      const batch = transformedContacts.slice(i, i + batchSize);
      const { error } = await supabase
        .from('contacts')
        .upsert(batch, {
          onConflict: 'provider,provider_id',
          ignoreDuplicates: false,
        });
      
      if (error) throw error;
    }

    return transformedContacts.length;
  } catch (error) {
    console.error('Error syncing contacts:', error);
    throw error;
  }
}