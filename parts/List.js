import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { auth,db } from "../firebase";

const List = ({id, chatName, enterChat}) => {
    const [chatMessages,setchatMessages]=useState([]);

    useEffect(()=>{
        const unsubscribe=db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot( (snapshot)=> setchatMessages(snapshot.docs.map( (doc) =>doc.data() )))

        return unsubscribe;

        });

    return(
        <ListItem key={id} onPress={()=> enterChat(id,chatName)} key={id} bottomDivider>
            <Avatar
               rounded 
               source={{uri: chatMessages?.[0]?.photoURL || 'https://a.cdn-hotels.com/gdcs/production118/d675/aebb75b6-c77e-4af9-836d-c868747ad0d8.jpg',}}
               />
               <ListItem.Content>
                   <ListItem.Title style={{ fontWeight: 'bold' }}>
                      {chatName}
                   </ListItem.Title>
                   <ListItem.Subtitle numberOfLines={1} ellipsizeMose="tail">
                      {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                   </ListItem.Subtitle>
               </ListItem.Content>
        </ListItem>
    );
};

export default List

const styles=StyleSheet.create({})