import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
  DevSettings,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const BGText = props => {
  const {background, padd} = props;
  return (
    <Text style={{backgroundColor: background, padding: padd, ...props.style}}>
      {props.children}
    </Text>
  );
};

const ChatDisplay = ({route, navigation}) => {
  const [msg, setmsg] = useState([]);
  const [text, settext] = useState([]);
  const [gettext, setgettext] = useState([]);
  const [Fetch, setfetch] = useState(true);
  const [userCheck, setuserCheck] = useState([]);
  const [usernumber, setusernumber] = useState('');
  const [username, setusername] = useState('');
  const [getTextt, setgetTextt] = useState(false);
  const [check, setcheck] = useState([]);
  const [show, setShow] = useState(false);
  const [butt, setbutt] = useState(true);
  const {user, Name, Number} = route.params;
  const user1 = user.number;
  console.log('data:', user, Name, Number);

  const data = async () => {
    try {
      if (msg == '') {
        console.log('blank');
      } else {
        await firestore().collection('Message').add({
          msg,
          date: Date.now(),
          uuid: user.uuid,
          name: Name,
        });
        setfetch(false);
        setmsg('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = async () => {
    const getmsg = await firestore().collection('Message').get();
    const getmsgdata = getmsg.docs.map(docSnap => docSnap.data());
    settext(getmsgdata);
    console.log('laya gya data', getmsgdata);
    console.log('i fire once', user1);
  };

  useEffect(() => {
    getdata();
    return () => {
      console.log('unamount');
    };
  }, [route, msg]);

  const msgsort = () => {
    var temp = [];
    var ddd;
    for (let i = 0; i < text.length; i++) {
      temp.push(text[i]);
      ddd = text[i].uuid;
    }
    for (let j = 0; j < gettext.length; j++) {
      temp.push(gettext[j]);
    }
    console.log('temp', temp);
    setcheck(temp);

    setShow(true);
  };

  useEffect(() => {
    msgsort();
    return () => {
      console.log('temp unamount');
    };
  }, [route, msg]);

  const LoadScren = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 150,
        }}>
        <Image
          source={require('./../img/ZZ5H.gif')}
          style={{width: 100, height: 100}}
        />
      </View>
    );
  };

  const refresh = () => {
    setbutt(false);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItem: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <View style={{margin: 12}}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.card, styles.shadowProp]}>
          {'   ' + user.name}
        </Text>
      </View>
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#E5EEEF'}}>
        <ScrollView>
          <View>
            {text
              .sort((a, b) => {
                return a.date - b.date;
              })
              .map(data => {
                if (data.name == Name && data.uuid == user.uuid) {
                  if (data.name == Name) {
                    return (
                      <Text
                        key={data.date}
                        style={{fontSize: 20, textAlign: 'right', margin: 8}}>
                        <BGText background="#fff"> {data.msg} </BGText>
                      </Text>
                    );
                  }
                }
                if (
                  data.name == user.name &&
                  data.uuid == auth().currentUser.uid
                ) {
                  return (
                    <Text
                      key={data.date}
                      style={{fontSize: 20, textAlign: 'left', margin: 8}}>
                      <BGText background="#fff"> {data.msg} </BGText>
                    </Text>
                  );
                }
              })}
          </View>
        </ScrollView>
        <View style={{justifyContent: 'flex-end', marginBottom: 3}}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    borderRadius: 50,
    width: '98%',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#27AE60',
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

export default ChatDisplay;
