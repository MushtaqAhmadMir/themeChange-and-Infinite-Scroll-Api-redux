import React from 'react';
import {StyleSheet, View, Image, Text, Touchable, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import en from '../constants/lang';
import fontFamily from '../styles/fontFamily';
import { connect } from 'react-redux';
 
 function Header({
  backButton,
  text,
  cartImg,
  textColor,
  menuIcon,
  tintColor,
  backgroundColor,
  onPress
  
}){
 
  return (
    <View style={styles.conatiner}>
      {menuIcon && <Image style={{
    height: 30,
     width: 30,tintColor:tintColor}} source={menuIcon} />}
      {text && <Text style={{ color:tintColor,
    fontFamily: fontFamily.lobester,
    fontSize: 35,
    alignSelf: 'center',
    paddingHorizontal: 100,}}>{text}</Text>}
      <TouchableOpacity onPress={onPress}>
      {cartImg && <Image style={{
    height: 30,
     width: 30,tintColor:tintColor}} source={cartImg} />}
      </TouchableOpacity>
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
    height: 30,
     width: 30,
      
    },
  text: {
    color: colors.themeColor,
    fontFamily: fontFamily.lobester,
    fontSize: 35,
    alignSelf: 'center',
    paddingHorizontal: 100,
  },
});

export default Header