import React from 'react';
import {Text, View} from 'react-native';

export default function ({text}) {
  return (
    <View
      style={{
        flex: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        padding: 10,
        
           
            
      }}>
      <View>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{text}</Text>
      </View>

      <Text style={{fontSize: 25, fontWeight: 'bold'}}>X</Text>
    </View>
  );
}
