import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { router } from 'expo-router';
import { LogOut, CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Event = {
  id: string;
  title: string;
  date: Date;
  imageUrl?: string;
};

export default function ProfileScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const user = auth().currentUser;

  useEffect(() => {
    if (!user) return;

    const subscriber = firestore()
      .collection('events')
      .where('userId', '==', user.uid)
      .orderBy('date', 'desc')
      .onSnapshot(querySnapshot => {
        const eventsList: Event[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          eventsList.push({
            id: doc.id,
            title: data.title,
            date: data.date.toDate(),
            imageUrl: data.imageUrl,
          });
        });
        setEvents(eventsList);
      });

    return () => subscriber();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await firestore().collection('events').doc(eventId).delete();
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      )}
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>
          {format(item.date, "d 'de' MMMM 'a las' HH:mm", { locale: es })}
        </Text>
        <View style={styles.eventActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit2 size={20} color="#6A1B9A" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteEvent(item.id)}>
            <Trash2 size={20} color="#d32f2f" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mi Perfil</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#6A1B9A" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{events.length}</Text>
          <Text style={styles.statLabel}>Eventos Publicados</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Mis Eventos</Text>

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Aún no has publicado ningún evento
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#6A1B9A',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f0ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#6A1B9A',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  eventsList: {
    gap: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  eventDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});