import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Calendar, Filter, MapPin, Phone, Instagram, CreditCard as Edit2 } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { router } from 'expo-router';

type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  phone?: string;
  instagram?: string;
  imageUrl?: string;
  userName: string;
  category: string;
};

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'teatro', label: 'Teatro' },
  { id: 'musica', label: 'Música' },
  { id: 'arte', label: 'Arte' },
  { id: 'otros', label: 'Otros' }
];

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = () => {
    const subscriber = firestore()
      .collection('events')
      .orderBy('date', 'asc')
      .onSnapshot(querySnapshot => {
        const eventsList: Event[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          eventsList.push({
            id: doc.id,
            ...data,
            date: data.date.toDate(),
          } as Event);
        });
        setEvents(eventsList);
        setLoading(false);
        setRefreshing(false);
      });

    return subscriber;
  };

  useEffect(() => {
    const subscriber = loadEvents();
    return () => subscriber();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const handleEditEvent = (eventId: string) => {
    router.push({
      pathname: '/create',
      params: { eventId }
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.eventCard}>
      {item.imageUrl && (
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.eventImage}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditEvent(item.id)}
          >
            <Edit2 size={18} color="#6A1B9A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.eventDate}>
          {format(item.date, "EEEE d 'de' MMMM 'a las' HH:mm", { locale: es })}
        </Text>
        
        <View style={styles.eventLocation}>
          <MapPin size={16} color="#666" />
          <Text style={styles.eventLocationText}>{item.location}</Text>
        </View>

        <Text style={styles.eventDescription} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.eventFooter}>
          <Text style={styles.eventAuthor}>Por {item.userName}</Text>
          
          <View style={styles.eventContacts}>
            {item.phone && (
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => {/* Handle phone contact */}}
              >
                <Phone size={20} color="#6A1B9A" />
              </TouchableOpacity>
            )}
            {item.instagram && (
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => {/* Handle Instagram contact */}}
              >
                <Instagram size={20} color="#6A1B9A" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eventos Culturales</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6A1B9A" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Calendar size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === item.id && styles.categoryButtonTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Calendar size={48} color="#6A1B9A" />
            <Text style={styles.emptyStateText}>
              {loading ? 'Cargando eventos...' : 
               searchQuery ? 'No se encontraron eventos' : 'No hay eventos disponibles'}
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
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#6A1B9A',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 24,
    color: '#333',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    padding: 0,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#6A1B9A',
  },
  categoryButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  list: {
    gap: 20,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  eventContent: {
    padding: 16,
    gap: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    flex: 1,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#333',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  eventDate: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#6A1B9A',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventLocationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  eventAuthor: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#666',
  },
  eventContacts: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyStateText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
});