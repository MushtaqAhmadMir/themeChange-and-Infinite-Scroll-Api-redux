import React from 'react';
import {View, Text, TextInput} from 'react-native';

export default function TextInputWithBottomBorder({
  placeholder,
  onChangeText,
  secureTextEntry,
  value,
  borderBottomWidth,
  borderBottomColor,
  fontSize,
  padding,
  keyboardType,
  placeholderTextColor,
}) {
  return (
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        value={value}
        style={{
          borderBottomWidth: borderBottomWidth,
          borderBottomColor: borderBottomColor,
          fontSize:fontSize,padding:padding

        }}
      />
 
  );
}
