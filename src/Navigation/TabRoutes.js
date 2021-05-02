import React, {Component} from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cart, Chat, ChatRow, Home, Search } from '../Screens';
import colors from '../styles/colors';
import navigationStrings from '../constants/navigationStrings';
import imagePath from '../constants/imagePath';
import Profile from '../Screens/Profile/profile';
import HomePage from '../Screens/Home/HomePage';
import { connect } from 'react-redux';



const Tab = createBottomTabNavigator();

function TabRoutes(props) {
  console.log(props.themeColor,"in  tab routes")
  const{newThemeColor}=props.themeColor
  return (
    <Tab.Navigator
     initialRouteName={navigationStrings.HOME_PAGE}
      tabBarOptions={{
        activeTintColor:colors.black,
      }} >
     <Tab.Screen
        name={navigationStrings.HOME_PAGE}
        component={HomePage}
        options={{
          
           tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:25,width:25, tintColor : focused ? (newThemeColor):colors.grey}} source={imagePath.home} />
             )
           }
        }
        }
       
      />
      <Tab.Screen name={'Chat'} component={ChatRow}  options={{
         
          tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:30,width:30,tintColor : focused ? (newThemeColor):colors.grey}} source={imagePath.ic_commet} />
             )
           }
         
        }} />
        <Tab.Screen name={navigationStrings.SEARCH} component={Search}  options={{
          showIcon:true,
          tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:40,width:40,tintColor : focused ? (newThemeColor):colors.grey}} source={imagePath.heart} />
             )
           }
         
        }} />
        <Tab.Screen name={navigationStrings.CART} component={Cart}  options={{
         
          tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:30,width:30,tintColor : focused ? (newThemeColor):colors.grey}} source={imagePath.cart} />
             )
           }
         
        }} />
         <Tab.Screen name={navigationStrings.PROFILE} component={Profile}  options={{
          tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:30,width:30,tintColor : focused ? (newThemeColor):colors.grey}} source={imagePath.profile} />
             )
           }
          
        }} />
     
       
      
     
    </Tab.Navigator>
  );
}

const mapStateToProps=state=>{

  return(
    {
      userData:state.auth.userData,
      themeColor:state.home.themeColor
    }
  )
}

export default connect(mapStateToProps)(TabRoutes)