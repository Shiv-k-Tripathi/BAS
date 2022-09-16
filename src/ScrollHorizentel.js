import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Avatar, List} from 'react-native-paper';
import Home from './Home';

const ScrollHorizentel = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {/* car */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Cars</Text>
          </View>
        </TouchableOpacity>
        {/* Bike */}
        <TouchableOpacity onPress={() => navigation.navigate('Bikeadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Bikes</Text>
          </View>
        </TouchableOpacity>
        {/* Mobiles */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Mobiles</Text>
          </View>
        </TouchableOpacity>
        {/* Laptops */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Laptops</Text>
          </View>
        </TouchableOpacity>
        {/* Home */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Home</Text>
          </View>
        </TouchableOpacity>
        {/* Jobs */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Jobs</Text>
          </View>
        </TouchableOpacity>
        {/* Eletronic */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Eletronic</Text>
          </View>
        </TouchableOpacity>
        {/* Pets */}
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <View style={[styles.infocar, {marginHorizontal: 12}]}>
            <View style={styles.imgcar}>
              <Avatar.Image size={80} source={require('../img/download.png')} />
            </View>
            <Text style={styles.textcar}>Pets</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Eletronicadd')}>
          <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
            CAR
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View>
        <Home />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    margin: 8,
  },
  infocar: {
    alignItem: 'center',
  },
  imgcar: {
    width: 80,
    hight: 80,
  },
  textcar: {
    textAlign: 'center',
    margin: 3,
    fontSize: 15,
  },
});

export default ScrollHorizentel;
