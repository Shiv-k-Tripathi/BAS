import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather'
import Login from './src/Login'
import ADD_ITEM from './src/Nav'
import Caradd from './src/Caradd'
import Signup from './src/Signup'
import PhoneAuth from './src/PhoneAuth'
import Home from './src/Home'
import Detail from './src/Detail'
import Account from './src/Account'
import Navsc from './src/Navsc'
import Chat  from './src/Chat'
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
 
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const TabNavigation =()=>{
    return  (
            <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'BUY') {
                  iconName = focused
                    ? 'home-outline'
                    : 'home-outline';
                } else if (route.name === 'ADD ITEM') {
                  iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
                }else if (route.name === 'ACCOUNT') {
                  iconName = focused ? 'person-outline' : 'person-outline';
                }
                else if (route.name === 'Chat') {
                  iconName = focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline';
                }
                
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
            >
              <Tab.Screen name="BUY" component={Navsc} options={{headerShown:false}} />
              <Tab.Screen name="ADD ITEM" component={ADD_ITEM}  /> 
              <Tab.Screen name="Chat" component={Chat}  /> 
              <Tab.Screen name="ACCOUNT" component={Account}  /> 
            </Tab.Navigator>
            )
  }
  const StackNavigation =()=>{
  return  (
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="PhoneAuth" component={PhoneAuth}  options={{headerShown:false}}/>
          </Stack.Navigator>
          )
  }
  const check=(userExist)=>{
    if (userExist) {
     setUser(userExist)
     console.log(userExist.email);
    } else{
      setUser('')
    }
}
  const [user, setUser] = useState('')
  const Navigatio=()=>{
   useEffect(() => {
    auth().onAuthStateChanged(check)}, [])
   return   (
    <NavigationContainer>
      { user?<TabNavigation/>:<StackNavigation/>}
    </NavigationContainer>
    )
  
  }
  return (
    <View style={styles.container}> 
        <Navigatio/>
    </View>
  )
}


const styles = StyleSheet.create({
  container :{
       flex:1
  }
})
export default App