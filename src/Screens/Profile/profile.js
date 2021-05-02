import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header';
import StatusBar from '../../Components/StatusBar';
import actions from '../../redux/actions';
import store from '../../redux/store';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import styles from '../Login/styles';
import {clearUserData} from '../../utils/utils';
import commonStyles from '../../styles/commonStyles';
import navigationStrings from '../../constants/navigationStrings';

// console.log(newthemeColor,"in profile")
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      colors: [
        {id: 1, colorId: '#FF4F28'},
        {id: 2, colorId: '#1A76CA'},
        {id: 3, colorId: '#3B9D38'},
        {id: 4, colorId: 'pink'},
        {id: 5, colorId: '#6200EE'},
        {id: 6, colorId: '#B00020'},
        {id: 7, colorId: '#03DAC5'},
        {id: 8, colorId: '#FFDE03'},
        {id: 9, colorId: '#FA8100'},
      ],
    };
  }

  changeTheme = (colorId) => {
    console.log(colorId);
    let data = {newThemeColor: colorId};
    actions.themeChange(data);
  };
  onLogout = () => {
    clearUserData().then(alert('logOut success'));
    actions.logout();
  };

  openModal = () => {
    this.setState({isVisible: true});
  };
  renderItem = (item) => {
    console.log(item.item.id, 'item.....');
    const {colorId} = item.item;
    console.log(colorId, 'color id');
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.changeTheme(item.item.colorId)}
          style={{backgroundColor: colorId, margin: 5}}>
          <View
            style={{
              borderWidth: 1,
              width: 30,
              height: 30,
              alignSelf: 'center',
              padding: 10,
              backgroundColor: colorId,
            }}></View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {newThemeColor} = this.props.themeColor;
    const {isVisible} = this.state;

    return (
      <View style={{backgroundColor: colors.lightGreyBg}}>
        <StatusBar bgcolor={newThemeColor} />
        <View>
          <Header
            menuIcon={imagePath.menu}
            text={strings.MY_PROFILE}
            tintColor={newThemeColor}
            cartImg={imagePath.cart}
          />
        </View>
        <View style={style.imgContainer}>
          <View style={style.imgView}>
            <Image
              style={{height: 120, width: 120, tintColor: newThemeColor}}
              source={imagePath.profile}
            />
          </View>
        </View>
        <View style={style.rowView}>
          <TouchableOpacity onPress={this.openModal}>
            <Text style={style.text}>{strings.CHANGE_THEME}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.rowView}>
          <Text style={style.text}>{strings.MY_ORDERS}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.text}>{strings.HELP}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.text}>{strings.WISHLIST}</Text>
        </View>
        <View style={style.rowView}>
          <TouchableOpacity onPress={this.onLogout}>
            <Text style={style.text}>{strings.LOGOUT}</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={isVisible}
          transparent
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={style.modalView}>
            <TouchableOpacity
              style={style.touchableView}
              onPress={() => {
                this.setState({isVisible: false});
              }}>
              <Image source={imagePath.cross} style={{height: 30, width: 30}} />
            </TouchableOpacity>
            <View style={style.colorView}>
              <FlatList
                data={this.state.colors}
                renderItem={this.renderItem}
                numColumns={3}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor: state.home.themeColor,
    facebookData: state.auth.facebookData,
  };
};
export default connect(mapStateToProps)(Profile);
const style = StyleSheet.create({
  rowView: {
    height: 70,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 10,
    marginTop: 5,
  },
  text: {
    ...commonStyles.fontSize18,

    fontWeight: 'bold',
  },
  colorView: {
    height: 130,
    width: 200,
    alignItems: 'center',
    padding: 2,
    marginLeft: 100,
  },
  modalView: {
    backgroundColor: colors.white,
    height: 130,
    margin: 20,
    position: 'relative',
    shadowColor: colors.buyBgDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 250,
  },
  touchableView: {
    position: 'absolute',
    height: 30,
    width: 30,
    right: -10,
    top: -10,
  },
  imgView: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    backgroundColor: colors.lightGreyBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  imgContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteOpacity77,
  },
});
