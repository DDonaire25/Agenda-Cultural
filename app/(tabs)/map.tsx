import { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import firestore from '@react-native-firebase/firestore';

type Event = {
  id: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [region, setRegion] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitu

deDelta: 0.0421,
        });
      }
    })();

    const subscriber = firestore()
      .collection('events')
      .onSnapshot(querySnapshot => {
        const eventsList: Event[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.latitude && data.longitude) {
            eventsList.push({
              id: doc.id,
              title: data.title,
              location: data.location,
              latitude: data.latitude,
              longitude: data.longitude,
            });
          }
        });
        setEvents(eventsList);
      });

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}>
        {events.map(event => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.title}
            description={event.location}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});