import React, {Component} from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search } from '../Screens';
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
     initialRouteName="Home"
      tabBarOptions={{
        activeTintColor:colors.black,
      }} >
     <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home', showIcon:true,
          
           tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:30,width:30, tintColor : focused ? (newThemeColor):"grey"}} source={imagePath.home} />
             )
           }
        }
        }
       
      />
        <Tab.Screen name="Search" component={Search}  options={{
          showIcon:true,
          tabBarLabel: 'Search',
          tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:40,width:40,tintColor : focused ? (newThemeColor):"grey"}} source={imagePath.heart} />
             )
           }
         
        }} />
        {/* <Tab.Screen name="Cart" component={Cart}  options={{
          tabBarLabel: 'Cart',
          tabBarIcon:(tintColor)=>
           {
             return(
               <Image style={{height:30,width:30,tintColor:colors.themeColor}} source={imagePath.cart} />
             )
           }
         
        }} /> */}
         <Tab.Screen name="Profile" component={Profile}  options={{
          tabBarLabel: 'Profile',
          tabBarIcon:({focused})=>
           {
             return(
               <Image style={{height:30,width:30,tintColor : focused ? (newThemeColor):"grey"}} source={imagePath.profile} />
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