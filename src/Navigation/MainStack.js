import React, {Fragment} from 'react';
import navigationStrings from '../constants/navigationStrings';
import { Home } from '../Screens';
  import DrawerNavigation from './DrawerNavigation';
import TabRoutes from './TabRoutes';


function MainStack(Stack) {
  return(
     <Fragment>
     <Stack.Screen
      name={navigationStrings.TAB_ROUTES}
      options={{
        headerShown:false
      }}
      component={TabRoutes}
    />
    <Stack.Screen
      name={navigationStrings.DRAWER_NAVIGATION}
      options={{
        headerShown:false
      }}
      component={DrawerNavigation}
    />

      </Fragment>
  )

}

export default MainStack;
