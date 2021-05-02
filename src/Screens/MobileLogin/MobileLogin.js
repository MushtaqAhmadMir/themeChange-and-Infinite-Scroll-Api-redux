import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from 'react-native';
import AuthHeader from '../../Components/AuthHeader';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import api from '../../redux/actions';
import StatusBar from '../../Components/StatusBar';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import Validation from '../../utils/validation';
import {showMessage} from 'react-native-flash-message';
import Loader from '../../Components/Loader';
import navigationStrings from '../../constants/navigationStrings';
import {otpTimerCounter} from '../../utils/helperFunctions';
import en from '../../constants/lang/en';
import styles from '../MobileLogin/styles';
import {connect} from 'react-redux';
import TextInputWithBottomBorder from '../../Components/TextInputWithBottomBorder';

function MobileLogin(props) {
  const [state, setState] = useState({
    isVisible: false,
    phoneNo: '',
    otp: '',
    isLoading: false,
    userId: '',
    timer: 100,
  });
  const {isVisible, isLoading, userId, timer, phoneNo, otp} = state;

  useEffect(async ()=>{
    (async () => {
      onLogPress()
  })();
  },[])
  const onLogPress = () => {
    handleInputs;
    if (isValidData()) {
      apiCall();
    }
  };
  const updateState = (data) =>
    setState((prevState) => ({...prevState, ...data}));

  const isValidData = () => {
    const error = Validation({phoneNumber: phoneNo});
    if (error) {
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    } else {
      return true;
    }
  };

  const apiCall = () => {
    updateState({isLoading: !isLoading});

    api
      .mobileVerify({
        contactDetails: {
          phoneNo: phoneNo,
          countryCode: '+91',
          countryCodeISO: 'IN',
        },
      })
      .then((res) => {
        updateState({isLoading: !isLoading, isVisible: !isVisible});
        console.log(res.data.userId, 'in mobile loign response');

        updateState({userId: res.data.userId});
      })
      .catch((error) => {
        updateState({isLoading: !isLoading});
        showMessage({
          message: error,
          type: 'danger',
        });
        console.log(error);
      });
    // }
  };

  const handleInputs = (key) => {
    return (value) => {
      updateState({[key]: value});
    };
  };

  const verifyOtp = () => {
    updateState({isLoading: true});

    console.log(otp, 'in verify');
    api
      .verifyOtp({
        userId,
        otp,
        deviceToken: '123',
        registerFrom: Platform.OS.toUpperCase(),
      })
      .then((res) => {
        console.log(res, 'otp verify in  data');

        updateState({isLoading: !isLoading});
        showMessage({
          message: 'successfully Verify',
          type: 'success',
          icon: 'success',
        });
        props.navigation.navigate(navigationStrings.TAB_ROUTES);
      })
      .catch((error) => {
        updateState({isLoading: !isLoading});
        console.log(error);
      });

    updateState({isVisible: !isVisible});
  };
  _onResend = () => {
    updateState({timer: 120});
  };

  const {newThemeColor} = props.themeColor;
  return (
    <View style={{flex: 1}}>
      <StatusBar bgcolor={newThemeColor} />
      <View style={{height: 70}}>
        <AuthHeader text={'MOBILE LOGIN'} />
      </View>
      <View style={{height: 150, margin: 10, justifyContent: 'space-around'}}>
        <TextInputWithBottomBorder
          placeholder={'Mobile No'}
          placeholderTextColor={newThemeColor}
          fontSize={18}
          padding={10}
          borderBottomWidth={2}
          borderBottomColor={newThemeColor}
          keyboardType={'number-pad'}
          onChangeText={handleInputs('phoneNo')}
        />
        <View style={{marginTop: 20}}>
          <ButtonWithLoader
            btnText={'GET OTP'}
            color={colors.white}
            btnStyle={styles.btnStyle}
            onPress={onLogPress}
            bgcolor={newThemeColor}
          />
        </View>
      </View>
      <View style={styles.socialRow}>
        <View style={styles.hyphen} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.hyphen} />
      </View>

      <View style={styles.socialIconView}>
        <TouchableOpacity>
          <View style={styles.iconView}>
            <Image
              style={styles.textFacebook}
              source={imagePath.facebookImage}
            />
            <Text>{en.FACEBOOK}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconView2}>
            <Image style={styles.textGoogle} source={imagePath.googleImage} />
            <Text>{en.GOOGLE}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.newUser}>
        <Text
          onPress={() => {
            props.navigation.navigate(navigationStrings.SIGNUP);
          }}
          style={styles.alreadyText}>
          {en.NEW_USER}
        </Text>
      </View>
      <Loader isLoading={isLoading} />
      <Modal visible={isVisible} transparent>
        <View
          style={{
            height: 500,
            backgroundColor: colors.lightGreyBg,
            margin: 20,
            shadowColor: colors.textGreyLight,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          <View style={{height: 60}}>
            <AuthHeader text={'VERIFY OTP'} />
          </View>
          <View
            style={{height: 150, margin: 10, justifyContent: 'space-around'}}>
            <TextInputWithBottomBorder
              placeholder={'Enter OTP'}
              placeholderTextColor={newThemeColor}
              fontSize={18}
              padding={10}
              borderBottomWidth={2}
              borderBottomColor={newThemeColor}
              keyboardType={'number-pad'}
              onChangeText={handleInputs('otp')}
            />
            <ButtonWithLoader
              btnText={'VERIFY OTP'}
              color={colors.white}
              btnStyle={styles.btnStyle2}
              onPress={verifyOtp}
              bgcolor={newThemeColor}
            />
          </View>
          {/* <Text style={{color:colors.themeColor,alignSelf:"flex-end",padding:10,fontSize:20}}>Resend Code</Text> */}
          {timer > 0 ? (
            <View style={{height: 200}}>
              <Text
                style={{
                  color: colors.textGreyLight,
                  alignSelf: 'flex-end',
                  margin: 15,
                }}>
                {en.RESEND_CODE_IN}
                <Text
                  style={{
                    color: newThemeColor,
                    //   fontFamily: fontFamily.futuraBtHeavy,
                  }}>
                  {` ${otpTimerCounter(timer)} min`}
                </Text>
              </Text>
            </View>
          ) : (
            <View style={{height: 100}}>
              <Text style={{color: colors.textGreyLight}}>
                {en.DIDNT_GET_OTP}
                <Text
                  onPress={this._onResend}
                  style={{
                    color: colors.themeColor,
                    //   fontFamily: fontFamily.futuraBtHeavy,
                  }}>
                  {' '}
                  {en.RESEND_CODE}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.home.themeColor,
  };
};
export default connect(mapStateToProps)(MobileLogin);
