import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import Validation from '../../utils/validation';
import api from '../../redux/actions';
import navigationStrings from '../../constants/navigationStrings';
import fontFamily from '../../styles/fontFamily';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import AuthHeader from '../../Components/AuthHeader';
import StatusBar from '../../Components/StatusBar'
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import styles from './styles';
import { connect } from 'react-redux';
import TextInputWithBottomBorder from '../../Components/TextInputWithBottomBorder';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      isLoading: false,
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phoneNumber:''
    };
  }


  handleInputs = (key) => {
    return (value) => {
      this.setState({[key]: value}, () => {
        // console.log(this.state)
      });
    };
  };

  onLogPress = () => {
    this.handleInputs;
    const {email, name, password, phoneNumber, confirmPassword} = this.state;
    this.isValidData();
    this.apiCall();
  };

  apiCall = () => {
    // alert("Api Call")
    const {email, name, password, phoneNumber, confirmPassword} = this.state;
    if (this.isValidData()) {
      //hit Api
      // alert("Valid Data")
      console.log({
        name: name,
        email: email,
        languageCode: 'EN',
        signupType: 'APP',
      });
      api
        .signup({
          name: name,
          email: email,
          password:password,
          languageCode: 'EN',
          signupType: 'APP',
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.log(res);
          this.props.navigation.navigate(navigationStrings.HOME_PAGE)
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log(error);
        });
    }
  };

  isValidData = () => {
    const {email, name, password, confirmPassword,phoneNumber} = this.state;
    // alert()
    const error = Validation({email, name, password, confirmPassword,phoneNumber});
    if (error) {
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    }
    this.setState({isLoading: true});
    showMessage({
      message: 'Sucessfully SignUp',
      type: 'success',
      icon: 'sucess',
    });
    return true;
  };


  render() {
    const {navigation} = this.props;
    const {newThemeColor}=this.props.themeColor
    return (
      <KeyboardAwareScrollView>
        <View style={{flex: 1}}>
          <StatusBar bgcolor={newThemeColor}/>
          <AuthHeader text={'Sign Up'} />
          <View
            style={{height: 300, margin: 10, justifyContent: 'space-around'}}>
            <TextInputWithBottomBorder
              placeholder={'Name'}
              placeholderTextColor={newThemeColor}
              fontSize={18}
              padding={10}
              borderBottomWidth={2}
              borderBottomColor={newThemeColor}
              onChangeText={this.handleInputs('name')}
            />
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
              placeholder={'Mobile No'}
              placeholderTextColor={newThemeColor}
              fontSize={18}
              padding={10}
              borderBottomWidth={2}
              borderBottomColor={newThemeColor}
              keyboardType={'number-pad'}
              onChangeText={this.handleInputs('phoneNo')}
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
           <TextInputWithBottomBorder
              placeholder={'Confirm Password'}
              placeholderTextColor={newThemeColor}
              fontSize={18}
              padding={10}
              borderBottomWidth={2}
              borderBottomColor={newThemeColor}
              onChangeText={this.handleInputs('confirmPassword')}
              secureTextEntry={true}
            />
            
          </View>
          <View style={{marginTop: 20}}>
            <ButtonWithLoader
              btnText={'SIGN UP'}
              color={colors.white}
              btnStyle={styles.btnStyle}
              onPress={this.onLogPress}
              bgcolor={newThemeColor}
            />
          </View>

          <View style={styles.socialRow}>
            <View style={styles.hyphen} />
            <Text style={styles.orText}>{strings.OR_SIGNUP_WITH}</Text>
            <View style={styles.hyphen} />
          </View>

          <View style={styles.socialIconView}>
            <TouchableOpacity>
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
                this.props.navigation.navigate(navigationStrings.LOGIN);
              }}
              style={{color:newThemeColor,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: fontFamily.lobester,}}>
              {strings.ALREADY_HAVE_AN_ACCOUNT}
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
export default connect (mapStateToProps)(Signup);
const style=StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    // width: 380,
    //  backgroundColor: '#4DB8BA',
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    // borderRadius:20
     
  },
})