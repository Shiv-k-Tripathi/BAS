import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';

const Refresh = ({navigation}) => {
  return (
    <View style={{
      flex:1,
    justifyContent: 'center',
    alignItems: 'center'}}>
      <Text>hi</Text>
      <Image
        source={require('./../img/Spinner-2.gif')}
        style={{width: 100, height: 100}}
      />
    </View>
  );
};

export default Refresh;

const styles = StyleSheet.create({});
