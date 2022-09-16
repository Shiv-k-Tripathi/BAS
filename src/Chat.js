import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Contacts from 'react-native-contacts';

const Chat = ({navigation}) => {
  const [msg, setmsg] = useState([]);
  const [msgdata, setmsgdata] = useState([]);
  const [Contactdata, setContactdata] = useState([]);
  const [userCheck, setuserCheck] = useState([]);
  const [Match, setMatch] = useState([]);
  const [show, setShow] = useState(false);
  const [UserName, setUserName] = useState('');
  const [UserNumber, setUserNumber] = useState('');

  const getu = async () => {
    const userdata = await firestore().collection('User').get();
    const udata = userdata.docs.map(docSnap => docSnap.data());
    setuserCheck(udata);
    console.log('user', udata);
  };
  useEffect(() => {
    getu();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  const getc = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then( 
      Contacts.getAll()
        .then(contacts => {
          // work with contacts
          setContactdata(contacts);
          // console.log(contacts)
        })
        .catch(e => {
          console.log(e);
        }),
    );
  };
  useEffect(() => {
    getc();
    return () => {
      console.log('contact unmount');
    };
  }, []);

  const data = async () => {
    
    console.log('press');
  };

  const plususer = () => {};

  const UserView = () => {
    setShow(true);
    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'red'}}>
        <ScrollView>
          <View></View>
        </ScrollView>
        <View style={{justifyContent: 'flex-end', marginBottom: 0}}>
          <View style={styles.main}>
            <TextInput
              value={msg}
              onChangeText={text => setmsg(text)}
              style={styles.input}
              placeholder="  Type here .."
              multiline={true}
            />
            <TouchableOpacity style={styles.send} onPress={data}>
              <Text style={{fontSize: 22}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  const userlist = userCheck.map(data => {
    return data.number;
  });
  const Contactlist = Contactdata.map(valu => {
    return valu?.phoneNumbers[0]?.number;
  });
  // console.log('userlist', userlist);
  // console.log('Contactlist', Contactlist);

  const find = (a, b) => {
    var d = [];
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < a.length; j++) {
        var c = a[j].slice(0, 5);
        var f = a[j].slice(5, 10);
        if (b[i] == c + ' ' + f || b[i] == '+91' + ' ' + c + ' ' + f) {
          d.push(b[i]);
        }
      }
    }
    return d;
  };

  useEffect(() => {
    userCheck.map(data => {
      if (data.uuid == auth().currentUser.uid) {
        return (
          setUserNumber(data.number),
          setUserName(data.name),
          console.log('bhejnewala', UserName, UserNumber)
        );
      }
    });
    return () => {
      console.log('hi');
    };
  }, [data]);
  return (
    // <UserView/>
    <View style={{flex: 1, justifyContent: 'center', alignItem: 'center'}}>
      <ScrollView>
        {find(userlist, Contactlist).map((a, i) => {
          return userCheck.map(data => {
            if (
              a == data.number.slice(0, 5) + ' ' + data.number.slice(5, 10) ||
              a ==
                '+91' +
                  ' ' +
                  data.number.slice(0, 5) +
                  ' ' +
                  data.number.slice(5, 10)
            ) {
              if (data.uuid == auth().currentUser.uid) {
              } else {
                return (
                  <View key={i} style={{margin: 5}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ChatDisplay', {
                          user: data,
                          Name: UserName,
                          Number: UserNumber,
                        })
                      }>
                      <Text style={[styles.card, styles.shadowProp]}>
                        {data.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            }
          });
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    borderRadius: 50,
    width: '98%',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
    marginBottom: 0,
  },
  input: {
    height: 40,
    width: 250,
    borderRadius: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    textAlignVertical: 'bottom',
  },
  send: {
    marginLeft: 45,
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 3,
    fontSize: 25,
    fontWeight: 'bold',
  },
  shadowProp: {
    shadowOffset: {width: -5, height: 9},
    shadowColor: '#B2BABB',
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
});

export default Chat;
