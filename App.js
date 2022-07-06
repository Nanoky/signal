import { Button } from '@rneui/base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {

  const sendRequest = (picture, location) => {

    fetch(picture.uri)
      .then(res => res.blob())
      .then(blob => {
        if (blob) {
          const file = new File([blob], "file.jpg")
          //console.log(JSON.stringify(file))

          const data = new FormData()
          data.append('photo', {
            uri: picture,
            name: picture?.name ?? "TEST",
            originalname: picture?.name ?? "TEST",
            type: picture.type
          });
          data.append("location", location);

          let url = "http://192.168.1.126:3010/upload/photoSinistre";

          axios.post(url, data, {
            // receive two parameter endpoint url ,form data 
          }).then(res => { // then print response status
            console.warn(res);
          }).catch((err) => {
            console.log(JSON.stringify(err));
            console.log(err);
          })
        }
      })
  }

  const handleSignal = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

    if (cameraPermission.status !== 'granted') {
      console.error('Permission to access camera was denied');
      return;
    }

    let image = await ImagePicker.launchCameraAsync();
    console.log(image);

    sendRequest(image, location);
  }

  return (
    <View style={styles.container}>
      <Button title={"Signaler"} onPress={handleSignal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
