import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Detail = ({navigation, Screen}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [disc, setDisc] = useState('');
  const [number, setNumber] = useState('');

  const postData = async () => {
    try {
      await firestore().collection('detail').add({
        name,
        price,
        year,
        disc,
        number,
        uid: auth().currentUser.uid,
      });
      console.log('hi shiv', name);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, margin: 20}}>Product Detail</Text>
      <View style={styles.box1}>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPrice(text)}
          value={price}
          placeholder="Price"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setYear(text)}
          value={year}
          placeholder="Year"
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
          placeholder="Mo Number"
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={postData}>
          <Text style={{color: 'black'}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 110,
    backgroundColor: 'skyblue',
  },
});
export default Detail;
