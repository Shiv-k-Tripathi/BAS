import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const press = async () => {
    if (email == '' || pass == '' || name =='') {
      if (number <=13) {
        Alert.alert('Invalid Number');
      }
      console.log('fill the blank');
      Alert.alert('Name,Email Or Password can not be blank');
      return;
    } else {
      try {
        const User = await auth().createUserWithEmailAndPassword(email, pass);
        console.log(User.user);
        await addUser();
        Alert.alert('Sign in succesfully');
        setEmail('');
        setNumber('');
        return navigation.navigate('Login');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        // Alert.alert(JSON.stringify(error),'The email address is already in use by another account')
        Alert.alert('Somthing Went Wrong', error);
      }
    }
  };

  const addUser=async ()=>{
try {
  await firestore().collection('User').add({
    name,
    number,
    email,
    pass,
    uuid:auth().currentUser.uid
  })
} catch (error) {
  Alert.alert('Invalid',error)
}
  }
  return (
    <KeyboardAvoidingView behavior="position">
      <Text style={styles.text}>SignUp</Text>
      <View style={styles.box1}>
        <Image
          style={styles.img}
          source={require('../img/user-login-icon-14.png')}
        />
      </View>
      <View style={styles.box2}>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setNumber(text)}
          value={number}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPass(text)}
          value={pass}
          placeholder="password"
          secureTextEntery={true}
        />
        <View style={{padding: 20}}>
          <Button onPress={press} title="Signup" color="skyblue" />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text>Already have an account</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PhoneAuth')}>
          <Text>Login With Mobile No.</Text>
        </TouchableOpacity> */}
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
    margin: 5,
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    margin: 12,
  },
  buttonl: {
    margin: 20,
  },
});

export default Signup;
