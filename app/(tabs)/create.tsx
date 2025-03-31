import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar as CalendarIcon, MapPin, Phone, Instagram, Image as ImageIcon, Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CATEGORIES = [
  { id: 'teatro', label: 'Teatro' },
  { id: 'musica', label: 'Música' },
  { id: 'arte', label: 'Arte' },
  { id: 'otros', label: 'Otros' }
];

export default function CreateEventScreen() {
  const { eventId } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [category, setCategory] = useState('otros');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  const loadEvent = async () => {
    try {
      const eventDoc = await firestore().collection('events').doc(eventId as string).get();
      if (eventDoc.exists) {
        const data = eventDoc.data();
        setTitle(data?.title || '');
        setDescription(data?.description || '');
        setDate(data?.date.toDate() || new Date());
        setLocation(data?.location || '');
        setPhone(data?.phone || '');
        setInstagram(data?.instagram || '');
        setCategory(data?.category || 'otros');
        setImage(data?.imageUrl || null);
      }
    } catch (err: any) {
      setError('Error al cargar el evento');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveEvent = async () => {
    try {
      setLoading(true);
      const user = auth().currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      if (!title || !description || !date || !location) {
        setError('Por favor completa los campos requeridos');
        return;
      }

      let imageUrl = image;
      if (image && !image.startsWith('http')) {
        const filename = `events/${user.uid}/${Date.now()}.jpg`;
        const reference = storage().ref(filename);
        await reference.putFile(image);
        imageUrl = await reference.getDownloadURL();
      }

      const eventData = {
        title,
        description,
        date,
        location,
        phone,
        instagram,
        category,
        imageUrl,
        userId: user.uid,
        userName: user.displayName,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      if (eventId) {
        await firestore().collection('events').doc(eventId as string).update(eventData);
      } else {
        eventData.createdAt = firestore.FieldValue.serverTimestamp();
        await firestore().collection('events').add(eventData);
      }

      router.back();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{eventId ? 'Editar Evento' : 'Crear Evento'}</Text>
        <Text style={styles.subtitle}>
          {eventId ? 'Actualiza los detalles del evento' : 'Comparte tu evento con la comunidad'}
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título del evento"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowDatePicker(true)}>
          <CalendarIcon color="#6A1B9A" size={20} />
          <Text style={styles.inputText}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <View style={styles.inputContainer}>
          <MapPin color="#6A1B9A" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Ubicación"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <Phone color="#6A1B9A" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Teléfono de contacto"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Instagram color="#6A1B9A" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Usuario de Instagram"
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoryLabel}>Categoría:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.id && styles.categoryButtonActive
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  category === cat.id && styles.categoryButtonTextActive
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          {image ? (
            <ImageIcon color="#6A1B9A" size={20} />
          ) : (
            <Upload color="#6A1B9A" size={20} />
          )}
          <Text style={styles.imageButtonText}>
            {image ? 'Cambiar imagen' : 'Subir imagen'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSaveEvent}
          disabled={loading}>
          <Text style={styles.saveButtonText}>
            {loading ? 'Guardando...' : eventId ? 'Guardar Cambios' : 'Crear Evento'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#6A1B9A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 20,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  inputText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#333',
  },
  categoriesList: {
    gap: 8,
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
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#6A1B9A',
    borderRadius: 8,
    padding: 14,
    gap: 10,
  },
  imageButtonText: {
    color: '#6A1B9A',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6A1B9A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  errorText: {
    color: '#d32f2f',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});