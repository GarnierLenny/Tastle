import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

global.centered = 0;

function App() {

  const showToast = () => {
    console.log("Toast clicked");
    ToastAndroid.show(
      "You clicked this toast!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
      );
    }

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
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        toolbarEnabled={true}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
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
