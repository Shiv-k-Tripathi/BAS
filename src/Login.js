import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const press = async () => {
    if (email == '' || number == '') {
      console.log('fill the blank');
      Alert.alert('Email Or Password can not be blank');
    } else {
      try {
        const userlog = await auth().signInWithEmailAndPassword(email, number);
        // firebase.auth().signInAnonymously(email,number)
        //  auth().signInWithEmailAndPassword(email,number)
        console.log(userlog.user);
        Alert.alert('log in succesfully', email);
        // navigation.navigate('BUY');
        console.log('log in succesfully');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        // Alert.alert(JSON.stringify(error),'The email address is already in use by another account')
        Alert.alert('Somthing Went Wrong ');
      }
    }
  };
  let onFocus = () => {
    setEmail({
      backgroundColor: 'green',
    });
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <Text style={styles.text}>Login</Text>
      <View style={styles.box1}>
        <Image
          style={styles.img}
          source={require('../img/user-login-icon-14.png')}
        />
      </View>
      <View style={styles.box2}>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setNumber(text)} 
          value={number}
          placeholder="password"
          secureTextEntry={true}
        />
        <View style={{padding: 20}}>
          <Button onPress={press} title="Login" color="skyblue" />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: 'black'}}>Don't have an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize: 30,
    color: 'black',
  },
  img: {
    hight: 200,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box2: {
    alignItem: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    margin: 20,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    margin: 20,
  },
  buttonl: {
    margin: 20,
  },
});

export default Login;
