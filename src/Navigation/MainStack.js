import React, {Fragment} from 'react';
import navigationStrings from '../constants/navigationStrings';
import { Home } from '../Screens';
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
      </Fragment>
  )

}

export default MainStack;
