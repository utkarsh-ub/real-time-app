import React,{ useLayoutEffect, useState, useEffect } from "react";
import { KeyboardAvoidingView,StyleSheet,ScrollView, Text, View ,SafeAreaView, 
         TouchableOpacity, Platform, _ScrollView, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { auth,db } from "../firebase";
import * as firebase from "firebase";


const chatscreen = ({navigation ,route}) => {
    const [input,setInput]=useState('');
    const [messages,setMessages]=useState([]);

    useLayoutEffect(()=>{
      navigation.setOptions({
         title:'Chat',
         headerTitle:()=>(
             <View style={{
                 flexDirection:'row',
                 alignItems:'center',
             }}>
                 <Avatar rounded source={{uri: messages[0]?.data.photoURL, }} />
                 <Text style={{color:"white" ,  marginLeft:10,  fontWeight:"bold"}}>{route.params.chatName}</Text>
             </View>
         ),
         
         headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:60,
                    marginRight:10,}} >
                    <TouchableOpacity>
                      <Foundation name="video" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="call" size={24} color="white" /> 
                    </TouchableOpacity>
                </View>
         ),
          });
      },[navigation,messages]);

     const sendMessage=()=>{
        Keyboard.dismiss(),
        db.collection('chats').doc(route.params.id).collection('messages').add({
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           message:input,
           displayName:auth.currentUser.displayName,
           email:auth.currentUser.email,
           photoURL:auth.currentUser.photoURL,
        });
        setInput('');
     };

     useLayoutEffect(()=>{
         const unsubscribe=db
         .collection('chats')
         .doc(route.params.id)
         .collection('messages')
         .orderBy('timestamp','desc')
         .onSnapshot((snapshot)=>setMessages(snapshot.docs.map(doc=>({
             id:doc.id,
             data:doc.data(),
         }))
         ));
     return unsubscribe;
     },[route])

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style="light" />
           <KeyboardAvoidingView 
            style={styles.container}
            keyboardVerticalOffset={90}
           >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             <>
             <ScrollView contentContainerStyle={{padding:15}}>
                 {messages.map(({id,data})=>(
                     data.email===auth.currentUser.email?(
                         <View key={id} style={styles.reciever}>
                              <Avatar containerStyle={{ position:"absolute" ,bottom:-15 ,right:-5 }}
                               position="absolute" bottom={-15} right={-5} 
                              rounded size={30} source={{uri:data.photoURL}}
                              />
                              <Text style={styles.recieverText}>{data.message}</Text>
                         </View>
                     ):(
                         <View key={id} style={styles.sender}>
                               <Avatar containerStyle={{ position:"absolute" ,bottom:-15 ,left:-5 }}
                                position="absolute" bottom={-15} left={-5} 
                              rounded size={30} source={{uri:data.photoURL}}/>
                               <Text style={styles.senderText}>{data.message}</Text>
                               <Text style={styles.senderName}>{data.displayName}</Text>
                         </View>
                     )
                 ))}
             </ScrollView>
                 <View style={styles.footer}>

                   <TextInput value={input} onChangeText={text =>setInput(text)} onSubmitEditing={sendMessage}
                    placeholder="Enter Message" style={styles.textinput} />
                   
                   <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                      <FontAwesome name="send" size={24} color="#00B8A9" />
                   </TouchableOpacity>

                 </View>
                 </>
               </TouchableWithoutFeedback>
       

           </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default chatscreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textinput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#EDEDED",
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    sender:{
        padding:15,
        backgroundColor:"#CDF2CA",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative",
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
})
