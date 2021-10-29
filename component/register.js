import React, { useLayoutEffect } from "react";
import {KeyboardAvoidingView, StyleSheet, View} from "react-native";
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text, Image} from 'react-native-elements';
import { useState } from "react";
import { auth } from "../firebase";

const register=({ navigation })=>{

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [imagelink,setImagelink]=useState('');

    useLayoutEffect(()=>{
      navigation.setOptions({
          headerBackTitle:"login",
      })
    },[navigation])

    const loading=()=>{
      auth.createUserWithEmailAndPassword(email,password)
      .then(authUser=>{
        authUser.user.updateProfile({
          displayName:name,
          photoURL:imagelink || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/405px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
        });
      }).catch((error)=>alert(error.message));
    };

 return(
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style='light'/>
      <Text h4 style={{marginBottom:50}}>Create a Schmooze account</Text>
      <View style={styles.input}>
        <Input placeholder="Full Name" autoFocus type='text' value={name} onChangeText={(text)=>setName(text)}/> 
        <Input placeholder="Email" type='email' value={email} onChangeText={(text)=>setEmail(text)} /> 
        <Input placeholder="Password" type='password' secureTextEntry value={password} onChangeText={(text)=>setPassword(text)} /> 
        <Input placeholder="Profile Picture URL(optional)" type='text' value={imagelink} onChangeText={(text)=>setImagelink(text)} onSubmitEditing={loading} /> 
      </View>
      <Button containerStyle={styles.button} onPress={loading} raised title='Register'/>
    </KeyboardAvoidingView>
 );
};

export default register;

const styles=StyleSheet.create({
    container:{
     flex: 1,
     alignItems:"center",
     justifyContent:"center",
     padding:10,
     backgroundColor:"white",
    },
    input:{
        width:"80%",
    },
    button:{
      width:200,
      marginTop:10,
    },
});