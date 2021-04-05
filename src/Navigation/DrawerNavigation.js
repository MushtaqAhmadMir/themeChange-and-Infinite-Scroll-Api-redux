import  React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import HomePage from '../Screens/Home/HomePage';
import { Cart, Profile } from '../Screens';




const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
   
      <Drawer.Navigator  >
       
        <Drawer.Screen name='Home' component={TabRoutes} />
        <Drawer.Screen name='Profile' component={Profile} />
        <Drawer.Screen name='Charts' component={Cart} />
        
      </Drawer.Navigator>
   
  );
}