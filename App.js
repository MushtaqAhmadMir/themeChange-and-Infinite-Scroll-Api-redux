import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import Routes from './src/Navigation/Routes';
import FlashMessage from 'react-native-flash-message';
import {getUserData} from './src/utils/utils';
import {  Provider } from 'react-redux';
import store from './src/redux/store';
import actions from './src/redux/actions';
import SplashScreen from 'react-native-splash-screen'


class App extends Component {
  
  componentDidMount() {
    getUserData().then((res) => {
      if (res) {
          actions.saveUserData(res);
          setTimeout(()=>{
            SplashScreen.hide();
          })
         
      }
      else
      {
        SplashScreen.hide();
      }
    });
   
    
  }

  render() {
    console.log(this.props,"userdata in ")
    return (
      <Fragment>
      <Provider store={store}>
        <Routes />
        </Provider>
        <FlashMessage position="top" />
      </Fragment>
    );
  }
}



export default App
