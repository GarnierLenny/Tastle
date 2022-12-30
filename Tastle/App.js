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
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
  });

  const changeRegion = (newRegion) => {
    setRegion(newRegion);
  }
  
  return (
    <View style={styles.container}>
     <MapView
      style={styles.map}
      onUserLocationChange={(event) => {
        if (centered == 1)
          return;
        centered = 1;
        console.log("recentered!");
        setRegion({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          });
        }
      } 
      region={region}
      showsUserLocation={true}
      followsUserLocation={true}
      showsMyLocationButton={true}
      myLocationButtonAnchor={{ x: 50, y: 50 }}
      mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
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
