import React from 'react';
import {StyleSheet, View, Image, Text, Touchable, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import en from '../constants/lang';

import { connect } from 'react-redux';
function ChatHeader({
    
    name,
    image,
    isOnline,
    
  }){
   console.log(image,'in ch')
    return (
      <View style={styles.conatiner}>
      <Image style={styles.img} source={{uri:image}}/>
      <Text style={styles.text}>{name}</Text>
      {isOnline ? (
              <Text style={{color: 'green', padding: 10}}>Online</Text>
            ) : (
              <Text>Offline</Text>
            )}
      </View>
    );
  }
  const styles = StyleSheet.create({
    conatiner: {
      height: 80,
      backgroundColor: colors.white,
      alignItems: 'center',
      flexDirection: 'row',
      padding: 20,
    },
    img: {
      height: 50,
       width: 50,
       borderRadius:30
        
      },
    text: {
      color: colors.black,
      fontSize: 20,
      alignSelf: 'center',
      paddingHorizontal: 20,
    },
  });
  
  export default ChatHeader