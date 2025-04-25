/*
  # Create contacts table and security policies

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `phone` (text, nullable)
      - `discipline` (text, nullable)
      - `role` (text, nullable)
      - `whatsapp` (text, nullable)
      - `instagram` (text, nullable)
      - `facebook` (text, nullable)
      - `notes` (text, nullable)
      - `image_url` (text, nullable)
      - `is_favorite` (boolean)
      - `provider` (text) - 'local', 'google', etc
      - `provider_id` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on contacts table
    - Add policies for CRUD operations
    - Only allow users to access their own contacts
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  discipline text,
  role text,
  whatsapp text,
  instagram text,
  facebook text,
  notes text,
  image_url text,
  is_favorite boolean DEFAULT false,
  provider text NOT NULL DEFAULT 'local',
  provider_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT proper_name CHECK (char_length(name) >= 2)
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own contacts"
  ON contacts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create contacts"
  ON contacts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
  ON contacts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
  ON contacts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX contacts_user_id_idx ON contacts(user_id);
CREATE INDEX contacts_email_idx ON contacts(email);
CREATE INDEX contacts_provider_idx ON contacts(provider, provider_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();