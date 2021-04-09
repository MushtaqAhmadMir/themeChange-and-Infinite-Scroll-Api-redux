import  React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import HomePage from '../Screens/Home/HomePage';
import { Cart, Profile } from '../Screens';
import DrawerContent from '../Components/DrawerContent'



const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
   
      <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>} >
       
        <Drawer.Screen name='Home' component={TabRoutes} />
        
      </Drawer.Navigator>
   
  );
}