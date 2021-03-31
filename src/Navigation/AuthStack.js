import React, {Fragment} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import Login from "../Screens/Login/Login";
import {LandingPage, Login, Signup,MobileLogin} from '../Screens';
import navigationStrings from '../constants/navigationStrings';

function AuthStack(Stack) {
  return (
    <Fragment>
      <Stack.Screen
        component={Signup}
        options={{
          headerShown: false,
        }}
        name={navigationStrings.SIGNUP}
      />
      <Stack.Screen
        component={Login}
        options={{
          headerShown: false,
        }}
        name={navigationStrings.LOGIN}
      />
      <Stack.Screen
      name={navigationStrings.MOBILE_LOGIN}
      options={{
        headerShown:false
      }}
      component={MobileLogin}
    />
    </Fragment>
  );
}

export default AuthStack;
