import React,{useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image, Icon} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';

const addChat = ({navigation}) => {
    const [input,setInput]=useState("");

    useLayoutEffect(()=>{
       navigation.setOptions({
           title:"Add a new chat",
           headerBackTitle:"chats",
       })
      },[navigation])

    const createChat=async()=>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack()
        }).catch(error=>alert(error))
    }  

    return (
        <View style={styles.container}>
            <Input placeholder='Enter the chat name' value={input} onChangeText={(text)=> setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="chatbubble-ellipses" type='ionicon' size={24} color="#00B8A9" />
            } />
            <Button onPress={createChat} raised title='Create New Chat' />
        </View>
    )
}

export default addChat

const styles = StyleSheet.create({
    container:{
      backgroundColor:"white",
      padding:30,
      height:"100%",
    }
});
