import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';

global.centered = 0;

async function askForLocationPermission() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    console.log('Location permission not granted');
  }
}

async function getUserLocation() {
  const location = await Location.getCurrentPositionAsync({});
  console.log(location);
}

function App() {

  const showToast = () => {
    console.log("Toast clicked");
    ToastAndroid.show(
      "You clicked this toast!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
      );
    }

  askForLocationPermission();
  getUserLocation();
  const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 50.00922,
      longitudeDelta: 50.00421,
  });

  const changeRegion = (newRegion) => {
    setRegion(newRegion);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        toolbarEnabled={true}
      />
      <Text style={styles.text}></Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '85%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: "#304ffe",
    fontSize: 20,
    padding: 20
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#29b6f6",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});
