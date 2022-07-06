import { Button } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {

  const [location, setLocation] = useState(null);
  const [picture, setPicture] = useState(null);

  const handleSignal = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation(location);

    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

    if (cameraPermission.status !== 'granted') {
      console.error('Permission to access camera was denied');
      return;
    }

    let image = await ImagePicker.launchCameraAsync();
    console.log(image);
    setPicture(image)
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
