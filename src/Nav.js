import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Caradd from './Caradd';
import Bikeadd from './Bikeadd';
import Test from './Test';
import Mobileadd from './Mobileadd';
import Eletronicadd from './Eletronicadd';
import Homeproductadd from './Homeproductadd';
import Pets from './Pets';
import Laptopadd from './Laptopadd';
import Jobadd from './Jobadd';

const Nav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Test"
        component={Test}
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
        name="Jobadd"
        component={Jobadd}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Nav;

const styles = StyleSheet.create({});
