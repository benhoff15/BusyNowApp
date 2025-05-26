import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getNearbyLocations } from '@/mocks/locations';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

const mockUserLocation = {
  latitude: 42.0454106,
  longitude: -87.6825521,
};

const busynessColors = {
  quiet: 'green',
  moderate: 'orange',
  busy: 'red',
};

export default function MapScreen() {
  const locations = getNearbyLocations();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...mockUserLocation,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={
              busynessColors[
                ['quiet', 'moderate', 'busy'].includes(location.currentBusyness!)
                ? location.currentBusyness as 'quiet' | 'moderate' | 'busy'
                : 'moderate'
              ]
            }
          >
            <Callout
              onPress={() => router.push(`/location/${location.id}`)}
              tooltip={false}
            >
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{location.name}</Text>
                <Text style={styles.calloutText}>{location.currentBusyness} right now</Text>
                <Text style={styles.calloutHint}>Tap to view more</Text>
              </View>
            </Callout>
          </Marker>
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
    height: '100%',
  },
  callout: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    width: 180,
  },
  calloutTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 12,
    color: '#555',
  },
  calloutHint: {
    fontSize: 10,
    color: colors.primary,
    marginTop: 4,
  },
});
