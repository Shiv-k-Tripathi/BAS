import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Caradd from './Caradd';
import Bikeadd from './Bikeadd';
import BikeShow from './BikeShow';
import CarShow from './CarShow';
import JobShow from './JobShow';
import HomeShow from './HomeShow';
import MobileShow from './MobileShow';
import PetShow from './PetShow';
import LaptopShow from './LaptopShow';
import ElectronicShow from './ElectronicShow';
import ScrollHorizentel from './ScrollHorizentel';
import Mobileadd from './Mobileadd';
import Eletronicadd from './Eletronicadd';
import Homeproductadd from './Homeproductadd';
import Pets from './Pets';
import Laptopadd from './Laptopadd';
import Jobadd from './Jobadd';
import Videos from './Videos';
import FullScreen from './FullScreen';
import Chat from './Chat';
import ChatDisplay from './ChatDisplay';
import Contact from './Contact';
import Home from './Home';
import Refresh from './Refresh'


const Navsc = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bikeadd"
        component={Bikeadd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Caradd"
        component={Caradd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Eletronicadd"
        component={Eletronicadd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mobileadd"
        component={Mobileadd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Homeproductadd"
        component={Homeproductadd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pets"
        component={Pets}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Laptopadd"
        component={Laptopadd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Refresh"
        component={Refresh}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Jobadd"
        component={Jobadd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bikes"
        component={BikeShow}
      />
      <Stack.Screen
        name="Car"
        component={CarShow}
      />
      <Stack.Screen
        name="Electronic"
        component={ElectronicShow}
      />
      <Stack.Screen
        name="Home_Product"
        component={HomeShow}
      />
      <Stack.Screen
        name="Laptops"
        component={LaptopShow}
      />
      <Stack.Screen
        name="Job"
        component={JobShow}
      />
      <Stack.Screen
        name="Mobiles"
        component={MobileShow}
      />
      <Stack.Screen
        name="Pet_Details"
        component={PetShow}
      />
      <Stack.Screen
        name="Video"
        component={Videos}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
      />
      <Stack.Screen
        name="ChatDisplay"
        options={{headerShown: false}}
        component={ChatDisplay}
      />
      <Stack.Screen
        name="FullScreen"
        component={FullScreen}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Navsc;
