import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Laptopadd = ({navigation, Screen}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [disc, setDisc] = useState('');
  const [number, setNumber] = useState('');
  const [image, setImage] = useState('');

  const OpenCamera = () => {
    launchCamera({quality: 0.9, maxWidth: 300, maxHeight: 300}, data => {
      // console.log(data.assets[0].uri);
      const uploadTask = storage()
        .ref()
        .child(`/laptop/${Date.now()}`)
        .putFile(data.assets[0].uri);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            setImage(downloadURL);
          });
        },
      );
    });
  };

  const postData = async () => {
    if (
      name == '' ||
      price == '' ||
      year == '' ||
      disc == '' ||
      number == '' ||
      image == false
    ) {
      Alert.alert('Input Field can not be blank');
    } else {
      try {
        await firestore().collection('laptopdetail').add({
          name,
          price,
          year,
          disc,
          number,
          image,
          uid: auth().currentUser.uid,
        });
        console.log('hi shiv', name);
        setName('');
        setPrice('');
        setYear('');
        setDisc('');
        setNumber('');
        setImage('');
        Alert.alert('Data Succesfully Added');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="bottom"
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <Text style={{fontSize: 30, margin: 20}}>Laptop Detail</Text>
        <View style={styles.box1}>
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Brand Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPrice(text)}
            value={price}
            placeholder="Price of Product"
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setYear(text)}
            value={year}
            placeholder="Year of Purches"
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setDisc(text)}
            value={disc}
            placeholder="Discription"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setNumber(text)}
            value={number}
            placeholder="Mo. Number"
            keyboardType='numeric'
          />
        </View>
        <View style={styles.button1}>
          <TouchableOpacity
            onPress={() => {
              OpenCamera();
            }}>
            <Text style={{color: 'black'}}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            onPress={postData}
            title="SUBMIT"
            disabled={image ? false : true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    borderWidth: 1,
    paddingHorizontal: 100,
    color: 'black',
  },
  box1: {
    alignItem: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    padding: 15,
  },
  button1: {
    padding: 15,
    paddingHorizontal: 130,
    backgroundColor: 'skyblue',
    margin: 10,
  },
});

export default Laptopadd;
