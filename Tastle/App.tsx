import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

declare global {
  let centered: number;
}

centered = 0;

interface loc {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

function App() {

  const showToast = () => {
    console.log("Toast clicked");
    ToastAndroid.show(
      "You clicked this toast!",
      ToastAndroid.SHORT);
    }

  const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
  });

  const changeRegion = (newRegion: loc) => {
    setRegion(newRegion);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tastle</Text>
      <MapView
        style={styles.map}
        onUserLocationChange={(event) => {
          if (centered == 1)
            return;
          centered = 1;
          console.log("recentered!");
          if (event.nativeEvent.coordinate) {
            setRegion({
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
              });
            }
          }
        } 
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}/>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.log_spotify_text}>
          Log in with Spotify
        </Text>
      </TouchableOpacity>
      <StatusBar backgroundColor="#1DB954" barStyle="light-content" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '15%',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    flex: 0.09,
    color: "#ffffff",
    fontSize: 20,
    padding: 0,
    textAlign: 'right',
    textAlignVertical: 'bottom'
  },

  log_spotify_text: {
    color: "#ffffff",
    fontSize: 20,
    padding: 0
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#1DB954",
    width: 1150,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});