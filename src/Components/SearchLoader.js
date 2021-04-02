import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Loader({isSearching}) {
  if (isSearching) {
    return (
      <View
        style={styles.view}>
        <ActivityIndicator color="red" size="small" />
      </View>
    );
  }

  return null;
}
const styles=StyleSheet.create({
  view:{
    position: 'absolute',
    top: 100,
    right: 20,
    // left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"rgba(0,0,0,0.5)"
  }
})