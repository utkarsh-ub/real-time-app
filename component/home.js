import React,{ useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet,ScrollView, Text, View ,SafeAreaView, TouchableOpacity} from 'react-native';
import List from "../parts/List";
import { Avatar } from 'react-native-elements';
import { auth,db } from "../firebase";
import { Foundation,FontAwesome } from '@expo/vector-icons';

const home=({navigation})=>{
    const [chats,setChats]=useState([]);

    const signOutUser=()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login');
        });
    };

    useEffect(() => {
        const unsubscribe=db.collection('chats').onSnapshot((snapshot)=>
            setChats(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data(),
            })))
        );
        return unsubscribe;
    }, [])

   useLayoutEffect(() => {

    navigation.setOptions({
        title:"Schmooze",        
        headerTitleAlign: 'center',
        headerTitleStyle:{color:"white"},
        headerTintColor:"black",
        headerLeft:()=> (<View style={{ marginLeft:10 }}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
           <Avatar rounded size='small' source={{ uri:auth?.currentUser?.photoURL}} />
           </TouchableOpacity>
        </View>),

        headerRight:()=> (<View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            width:60,
            marginRight:10,
        }}>
          <TouchableOpacity activeOpacity={0.5}>
          <Foundation name="camera" size={24} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('AddChat')} activeOpacity={0.5}>
          <FontAwesome name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>),
    });
    
   }, [navigation]);


   const enterChat= (id,chatName)=>{
       navigation.navigate('ChatScreen',{
           id,
           chatName,
       });
   };

   return(
    <SafeAreaView>
        <ScrollView style={styles.container} >
            {chats.map(({id, data:{chatName} })=>(
                 <List 
                 key={id} 
                 id={id} 
                 chatName={chatName}
                 enterChat={enterChat}
                 />
            ))}
        </ScrollView>
    </SafeAreaView>
   );
};
export default home;

const styles=StyleSheet.create({
    container:{
        height:"100%",
    }
});