import React from 'react';
import {View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import imagePath from '../constants/imagePath';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from '../Navigation/TabRoutes';
import colors from '../styles/colors';
const image=imagePath.mypic
function DrawerContent(props) {
  //   const onLogout = () => {

  //   };
 
  const {navigation, themeColor} = props;
  console.log(props, 'dfgh');
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <ImageBackground source={imagePath.bg6} style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 65}}>
            <TouchableOpacity onPress={()=>navigation.navigate('imageViewer')}>
              <Avatar.Image source={image}  size={50} />
              </TouchableOpacity>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Mushtaq Ahmad</Title>
                <Caption style={styles.caption}>aariyanalee786@gmail.com</Caption>
              </View>
            </View>
          </ImageBackground>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({focused, size}) => (
                <Image
                  source={imagePath.home}
                  style={[{height: 30, width: 30}]}
                />
              )}
              label="Home"
              onPress={() => alert('Link to help')}
            />

            <DrawerItem
              icon={({focused, size}) => (
                <Image
                  source={imagePath.cart}
                  style={[{height: 25, width: 28}]}
                />
              )}
              label="Cart"
              onPress={() => {
                navigation.navigate(navigationStrings.CART);
              }}
            />
            

            <DrawerItem
              icon={({focused, size}) => (
                <Image
                  source={imagePath.ic_search}
                  style={[{height: 25, width: 25}]}
                />
              )}
              label="Settings"
            />
            <DrawerItem
             icon = {({ focused, size }) => (
                <Image
                  source={imagePath.heart}
                  style={[{ height: 30, width: 25 }]}
                /> ) }
             label="Support" />

             <DrawerItem
             icon={({focused, size}) => (
                <Image
                  source={imagePath.ic_Qr}
                  style={[{height: 30, width: 30}]}
                />
              )}
              label="Generate Qr Code"
              onPress={() => {
                navigation.navigate(navigationStrings.QR_SCREEN);
              }}
            />
            <DrawerItem
             icon={({focused, size}) => (
                <Image
                  source={imagePath.ic_Qr}
                  style={[{height: 30, width: 30}]}
                />
              )}
              label="Scan Qr Code"
              onPress={() => {
                navigation.navigate(navigationStrings.QR_SCANNER);
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        {/* <ButtonWithLoader
          btnStyle={styles.buttonStyle}
          btnText="LogOut"
          bgColor={themeColor}
          btnTextStyle={20}
          onPress={() => onLogout()}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    height:120
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color:colors.white
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color:colors.white
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonStyle: {
    borderWidth: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    themeColor: state.home.themeColor,
  };
};

export default connect(mapStateToProps)(DrawerContent);
