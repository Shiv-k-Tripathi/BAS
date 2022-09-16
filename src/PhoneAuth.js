import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  FlatList,
  ListItem
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import Contacts from 'react-native-contacts';

const PhoneAuth = ({navigation}) => {
  const datac = Contacts;
  const [mnumber, setmnumber] = useState('');
  const [vShow, setvShow] = useState(true);
  const [capcha, setcapcha] = useState([]);

  const getc = async () => {
    Contacts.getAll()
      .then(contacts => {
        console.log(JSON.stringify(contacts));
        setcapcha(contacts);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getc();
    return () => {
      console.log('hi');
    };
  }, []);

  function textsubmit(text) {
    if (text.length > 13) {
      Alert.alert('Invalid Mobile Number');
    }
    const data = text.slice(0, 13);
    setmnumber(data);
  }

  const submit = async () => {
    if (mnumber.length == 13) {
      Alert.alert('Mobile Number', mnumber);
      const confirmation = await auth().signInWithPhoneNumber(mnumber);
      setvShow(false);
    } else {
      Alert.alert('Invalid Mobile Number', mnumber);
    }
  };

  const Verify = async () => {
    try {
      await confirm.confirm(capcha);
      console.log(capcha);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  };




  return (
    <View style={styles.main}>
      {/* <ScrollView>
        {capcha.map((valu, i) => {
          return (
            <View key={i}>
              <Text style={{textAlign: 'center'}}>{valu.displayName}</Text>
              <Text style={{textAlign: 'center'}}>{valu?.phoneNumbers[0]?.number} </Text>
              <Text>{''}</Text>
            </View>
          );
        })}
      </ScrollView> */}
      <Text style={{margin: 8, fontSize: 25, textAlign: 'center'}}>
        INPUT MOBILE NUMBER
      </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="   Phone Number"
          value={mnumber}
          onChangeText={text => textsubmit(text)}
        />
        <View style={styles.button}>
          <Button title="Submit" onPress={submit} />
        </View>
      </View>
      
        <View>
          <TextInput
            style={styles.input}
            placeholder="   Enter Capcha"
            value={capcha}
            onChangeText={text => textsubmit(text)}
          />
          <View style={styles.button}>
            <Button title="Verify" onPress={Verify} />
          </View>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 35,
  },
  button: {
    padding: 35,
  },
});

export default PhoneAuth;




// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const PhoneAuth=()=> {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+918299535242')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }
// export default PhoneAuth