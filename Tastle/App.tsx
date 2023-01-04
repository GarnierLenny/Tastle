import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import * as axios from 'axios';
import { URLSearchParams } from 'url';

declare global {
  let centered: number;
  let requested: number;
}

centered = 0;
requested = 0;

interface loc {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
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

  const redirectUri = 'exp://192.168.1.75:19000';

  const handleRedirect = (event) => {
    if (requested == 1)
      requested = 1;
    else {
      requested = 1;
      const { url } = event;
      const URL = require('url').Url;
    
      const clientId = '099b248b017649f083859fa8ba93c3d5';
      const clientSecret = 'd389157202e946ba94ae66da1f826dbd';

      var tokenRequest = {
        grant_type:    'authorization_code',
        code:          url.split('=')[1],
        redirect_uri:  redirectUri,
        client_secret: clientSecret,
        client_id:     clientId,
      };

      var encoded = [];

      for (var property in tokenRequest) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(tokenRequest[property]);
        encoded.push(encodedKey + "=" + encodedValue);
      }
      encoded = encoded.join("&");

      const options: RequestInit = {
        method: 'POST',
        body: encoded,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };  

      fetch('https://accounts.spotify.com/api/token', options)
        .then(response => response.json())
        .then((data) => {console.log("data:", data);})
        .catch((err) => {console.log(err)});
    }
  };

  Linking.addEventListener('url', handleRedirect);

  const openLoginPage = () => {
    try {
      Linking.openURL(`https://accounts.spotify.com/en/authorize?client_id=099b248b017649f083859fa8ba93c3d5&response_type=code&redirect_uri=${redirectUri}&scope=playlist-modify-public`);
    } catch (error) {
      console.log(error);
    }
  }

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
      <TouchableOpacity style={styles.button} onPress={() => {openLoginPage();}}>
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