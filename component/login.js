import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image} from 'react-native-elements';
import { auth } from '../firebase';

const login = ({navigation}) => {
    
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
        navigation.navigate('Home');
      }
    });

    return unsubscribe;

  },[]);

  const signIn=()=>{
    auth.signInWithEmailAndPassword(email,password)
    .catch(error=>alert(error));
  };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light'/>
            <Image source={require("../assets/img.jpg")} style={{ width: 350 , height: 350 }}/>

             <View style={styles.enterDetails}>
             <Input placeholder='Email' autoFocus type="email" value={email} onChangeText={(text)=> setEmail(text)} />
             <Input placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text)=> setPassword(text)}
             onSubmitEditing={signIn} />
             </View>
            
             <Button containerStyle={styles.button} onPress={signIn} raised title='Login' />
             <Button containerStyle={styles.button} onPress={()=>navigation.navigate('Register')} type="outline" raised title='Register' />
             {/* <View style={{height:100}} /> */}
        </KeyboardAvoidingView>
    )
}

export default login

const styles = StyleSheet.create({
    container:{
     flex: 1,
     alignItems:"center",
     justifyContent:"center",
     padding:10,
     backgroundColor:"white",
    },
    enterDetails:{
        width:"80%",
    },
    button:{     
      width:200,
      marginTop:10,
    },
})
