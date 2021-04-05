import axios from 'axios';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import imagePath from '../../constants/imagePath';
import api from '../../redux/actions';
import navigationStrings from '../../constants/navigationStrings';

import Validation from '../../utils/validation';

import StatusBar from '../../Components/StatusBar';
import AuthHeader from '../../Components/AuthHeader';
import colors from '../../styles/colors';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import strings from '../../constants/lang/en';
import styles from '../Login/styles';
import TextInputWithBottomBorder from '../../Components/TextInputWithBottomBorder';
import { connect } from 'react-redux';
import fontFamily from '../../styles/fontFamily';
import { LoginManager, AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk'
import actions from '../../redux/actions';
import { setUserData } from '../../utils/utils';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesbd: [],
      resourcePath: imagePath.camera,
      email: '',
      password: '',
      bgUrl: imagePath.bg4,
      userInfo:{}
    };
  }

  handleInputs = (key) => {
    return (value) => {
      this.setState({[key]: value});
    };
  };

  onLogPress = () => {
    this.handleInputs;
    this.isValidData();
    this.apiCall();
    // this.apicall2();
  };

  apiCall = () => {
     alert("Api Call")
    const {email, password} = this.state;
    if (this.isValidData()) {
      // alert('Valid Data');
      api
        .login({
          email: email,
          password: password,
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.log(res,"api calll");
          
     showMessage({
      message: 'Sucessfully Login',
      type: 'success',
      icon: 'sucess',
    });
          this.props.navigation.navigate(navigationStrings.HOME_PAGE);
        })
        .catch((error) => {
          showMessage({
            message: error,
            type: 'danger',
            icon: 'danger',
          });
          this.setState({isLoading: false});
          console.log(error,"in error");
        });
    }
  };

  isValidData = () => {
    const {email, password} = this.state;
    //  alert()
    const error = Validation({email, password});
    if (error) {
      // alert(error);
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    }


    return true;
  };

  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken)
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
           
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  // onLogoutFinished=() => this.setState({userInfo: {}})

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name, picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({userInfo: result});
          setUserData(result)
          this.props.navigation.navigate(navigationStrings.TAB_ROUTES)
          console.log('result:', result);
          
         }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  render() {
    // console.log(arr)

    const {bgUrl, resourcePath,userInfo} = this.state;
    const {navigation} = this.props;
    const{newThemeColor}=this.props.themeColor
    // alert(JSON.stringify(userInfo))
    return (
      <KeyboardAwareScrollView>
        <View style={{flex: 1}}>
          <StatusBar />
          <AuthHeader text={'LOGIN'} />
          <View
            style={{height: 150, margin: 10, justifyContent: 'space-around'}}>
            {/* <TextInput
              placeholderTextColor={colors.themeColor}
              placeholder="Email"
              style={styles.textInput}
              onChangeText={this.handleInputs('email')}
            /> */}
             <TextInputWithBottomBorder
                placeholder={'Email'}
              placeholderTextColor={newThemeColor}
              fontSize={18}
              padding={10}
              borderBottomWidth={2}
              borderBottomColor={newThemeColor}
              onChangeText={this.handleInputs('email')}
             />
             <TextInputWithBottomBorder
              placeholder={'Password'}
              placeholderTextColor={newThemeColor}
              fontSize={18}
              padding={10}
              borderBottomWidth={2}
              borderBottomColor={newThemeColor}
              onChangeText={this.handleInputs('password')}
              secureTextEntry={true}
            />
            {/* <TextInput
              placeholderTextColor={colors.themeColor}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={this.handleInputs('password')}
            /> */}
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(navigationStrings.MOBILE_LOGIN)
            }
            style={{ alignItems: 'center',
      backgroundColor: newThemeColor,
      height: 20,
      borderRadius: 20,
      width: 100,
      alignSelf: 'flex-end',
      marginRight: 15,}}>
            <Text style={{color: colors.white}}>{strings.LOG_IN_VIA_OTP}</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20}}>
            <ButtonWithLoader
              btnText={'LOG IN'}
              color={colors.white}
              btnStyle={styles.btnStyle}
              onPress={this.onLogPress}
              bgcolor={newThemeColor}
            />
          </View>

          <View style={styles.socialRow}>
            <View style={styles.hyphen} />
            <Text style={styles.orText}>{strings.OR_LOGIN_WITH}</Text>
            <View style={styles.hyphen} />
          </View>

          <View style={styles.socialIconView}>
            <TouchableOpacity onPress={this.loginWithFacebook}>
              <View style={styles.iconView}>
                <Image
                  style={styles.textFacebook}
                  source={imagePath.facebookImage}
                />
                <Text>{strings.FACEBOOK}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconView2}>
                <Image
                  style={styles.textGoogle}
                  source={imagePath.googleImage}
                />
                <Text>{strings.GOOGLE}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 75,
            }}>
            <Text
              onPress={() => {
                this.props.navigation.navigate(navigationStrings.SIGNUP);
              }}
              style={{ color: newThemeColor,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: fontFamily.lobester,
   }}>
              {strings.NEW_USER}
            </Text>
          </View>
        
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps=state=>
{
  return{
    themeColor:state.home.themeColor
  }
}
export default connect(mapStateToProps)(Login)
