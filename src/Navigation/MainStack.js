import React, {Fragment} from 'react';
import navigationStrings from '../constants/navigationStrings';
import { Cart,  Chat,  ImageViewer, QRScanner, QRScreen,} from '../Screens/index';
import DrawerNavigation from './DrawerNavigation';

import TabRoutes from './TabRoutes'

function MainStack(Stack) {
  return(
     <Fragment>
     
    <Stack.Screen
      name={navigationStrings.DRAWER_NAVIGATION}
      options={{
        headerShown:false
      }}
      component={DrawerNavigation}
    />
    <Stack.Screen
      name={navigationStrings.CART}
      options={{
        headerShown:false
      }}
      component={Cart}
    />
    <Stack.Screen
      name={navigationStrings.IMAGEVIEWER}
      options={{
        headerShown:false
      }}
      component={ImageViewer}
    />
    <Stack.Screen
      name={navigationStrings.QR_SCREEN}
      options={{
        headerShown:false
      }}
      component={QRScreen}
     />
    <Stack.Screen
      name={navigationStrings.QR_SCANNER}
      options={{
        headerShown:false
      }}
      component={QRScanner}
    />
<Stack.Screen
      name={navigationStrings.CHAT}
      options={{
        headerShown:false
      }}
      component={Chat}
    />

      </Fragment>
  )

}

export default MainStack;
