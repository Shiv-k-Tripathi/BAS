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

const Test = ({navigation}) => {
  return (
    <View style={styles.box1}>
      <View style={styles.container}></View>
      <View style={styles.bike1}>
        <TouchableOpacity onPress={() => navigation.navigate('Bikeadd')}>
          <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
            BIKE
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bike}>
        <TouchableOpacity onPress={() => navigation.navigate('Caradd')}>
          <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
            CARS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Mobileadd')}>
            <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
              MOBILE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.laptop}>
        <TouchableOpacity onPress={() => navigation.navigate('Laptopadd')}>
          <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>
            LAPTOPS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.home}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Homeproductadd')}>
            <Text style={{color: 'black', fontSize: 27, textAlign: 'center'}}>
              HOME PRODUCT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.job}>
        <TouchableOpacity onPress={() => navigation.navigate('Jobadd')}>
          <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
            JOBS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.electric}>
          <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
            <Text style={{color: 'black', fontSize: 28, textAlign: 'center'}}>
              ELECTRIC PRODUCT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('Pets')}>
          <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
            PETS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
  },
  container: {
    flexDirection: 'row',
    borderColor: 'black',
    margin: 2,
  },
  button: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
  laptop: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
  home: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    marginRight: 2,
    backgroundColor: '#fff',
  },
  electric: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    marginRight: 2,
    backgroundColor: '#fff',
  },
  bike1: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    marginRight: 2,
    backgroundColor: '#fff',
    margin:2
  },
  bike: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    marginRight: 2,
    backgroundColor: '#fff',
  },
  job: {
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
});
export default Test;
