import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './component/login';
import register from './component/register';
import home from './component/home';
import addChat from './component/addChat';
import chatscreen from './component/chatscreen';
const Stack=createNativeStackNavigator();

const globalVar={
  headerStyle: {backgroundColor: "#00B8A9"},
  headerTitleStyle: {color:"white"},
  headerTintColor:"white",
  headerTitleAlign: 'center'
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      //initialRouteName='Home' 
      screenOptions={globalVar}>
       <Stack.Screen name='Login' component={login} />
       <Stack.Screen name='Register' component={register} />
       <Stack.Screen name='Home' component={home} />
       <Stack.Screen name='AddChat' component={addChat} />
       <Stack.Screen name='ChatScreen' component={chatscreen} />
      </Stack.Navigator>
      
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
