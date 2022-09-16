import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, List} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  db,
  updateDoc,
  deleteField,
} from '@react-native-firebase/firestore';
import {IconButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Account = ({navigation}) => {
  const [expanded, setExpanded] = useState(true);
  const [data, setdata] = useState([]);
  const [adata, setAdata] = useState([]);
  const [image, setImage] = useState(false);
  const [butt, setbutt] = useState(true);
  const [profile, setProfile] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const Acc = () => {};

  const postData = async () => {
    if (image == false) {
      Alert.alert('Input Field can not be blank');
    } else {
      try {
        await firestore().collection(auth().currentUser.uid).add({
          image,
          uid: auth().currentUser.uid,
        });
        console.log('hi shiv', image);
        Alert.alert('Data Succesfully Added');
        setbutt(true);
        setImage('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pullrefresh = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  const getdata = async () => {
    const userdata = await firestore().collection('cardetail').get();
    const udata = userdata.docs.map(docSnap => docSnap.data());
    setdata(udata);
    console.log('axx ', udata.uid);
  };
  useEffect(() => {
    getdata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  // profile photo
  const profiledata = async () => {
    const pdata = await firestore().collection(auth().currentUser.uid).get();
    const prodata = pdata.docs.map(docSnap => docSnap.data());
    setShow(true);
    setProfile(prodata);
    console.log('profile', prodata);
  };
  useEffect(() => {
    profiledata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  const bikedata = async () => {
    const bidata = await firestore().collection('bikedetail').get();
    const bdata = bidata.docs.map(docSnap => docSnap.data());
    setAdata(bdata);
    console.log('axx', bdata);
  };
  useEffect(() => {
    bikedata();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [refresh]);

  const OpenCamera = () => {
    launchCamera({quality: 0.5}, data => {
      // console.log(data.assets[0].uri);
      const uploadTask = storage()
        .ref()
        .child(`/profile/${Date.now()}`)
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
  const del = async () => {
    setbutt(false);
    console.log('del');
    try {
      const dele = firestore().collection(auth().currentUser.uid);
      console.log(dele);
      dele.get().then(querySnapshot => {
        Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
      });
      console.log(data.image);
      Alert.alert('delete');
      setTimeout(() => {
        OpenCamera();
      }, 5000);

      // setImage('');
    } catch (error) {
      console.log(error);
    }
  };

  const Edit = () => {
    return (
      <View style={{margin: 10}}>
        <Icon.Button name="plus" size={20} title="" onPress={() =>  del()}>
          Edit Profile
        </Icon.Button> 
      </View>
    );
  };

  const AddP = () => {
    return (
      <View style={{margin: 10}}>
        <Button
          icon="plus"
          size={30}
          title="Add Pofile"
          disabled={image ? false : true}
          onPress={() => postData()}
        />
      </View>
    );
  };
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => pullrefresh()} />
      }>
      <View style={styles.img}>
        {/* data?data.image: */}
        {profile.map(data => {
          return (
            <Avatar.Image
              key={data.uid}
              size={200}
              source={{
                uri: show
                  ? data.image
                  : 'https://www.freeiconspng.com/images/login-icon',
              }}
            />
          );
        })}
        <View style={styles.icon}>
          <IconButton icon="camera" size={30} onPress={() => OpenCamera()} />
        </View>
        {butt ? <Edit /> : <AddP />}
        <Text style={{fontSize: 20, margin: 10}}>
          {auth().currentUser.email}
        </Text>
      </View>
      <View style={styles.logout}>
        <Button
          onPress={() => auth().signOut()}
          title="logout"
          color="skyblue"
        />
      </View>
      <View style={styles.acc}>
        <List.Section>
          <List.Accordion title="YOUR ORDER" id="2">
            {data.map(data => {
              return data.uid == auth().currentUser.uid ? (
                <List.Item key={data.name} title={data.name} />
              ) : (
                ''
              );
            })}
            {adata.map(data => {
              return data.uid == auth().currentUser.uid ? (
                <List.Item key={data.name} title={data.name} />
              ) : (
                ''
              );
            })}
          </List.Accordion>
          <List.Accordion title="Setting" id="2">
            <TouchableOpacity
              onPress={() => {
                auth().signOut();
              }}>
              <Text style={styles.touch}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('help');
              }}>
              <Text style={styles.touch}>Change Password</Text>
            </TouchableOpacity>
          </List.Accordion>

          <List.Accordion title="Help & Support">
            <TouchableOpacity
              onPress={() => {
                console.log('help');
              }}>
              <Text style={styles.touch}>Help Center</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                del();
              }}>
              <Text style={styles.touch}>Invite Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('rate us');
              }}>
              <Text style={styles.touch}>Version</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('rate us');
              }}>
              <Text style={styles.touch}>Rate Us</Text>
            </TouchableOpacity>
          </List.Accordion>
        </List.Section>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    //  justifyContent: 'center',
    //  alignItems: 'center'
  },
  img: {
    margin: 10,
    alignItems: 'center',
  },
  logout: {
    margin: 5,
  },
  acc: {
    margin: 5,
    width: '98%',
  },
  icon: {
    margin: -20,
  },
  touch: {
    fontSize: 18,
    margin: 8,
    fontWeight: 'bold',
  },
});

export default Account;
