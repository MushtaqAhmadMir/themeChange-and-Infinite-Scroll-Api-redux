import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
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
import ButtonWithLoader from './ButtonWithLoader';
const image = imagePath.mypic;

function DrawerContent(props) {
  const {navigation, themeColor} = props;
  console.log(props, 'dfgh');
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <ImageBackground
            source={imagePath.bg6}
            style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 65}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('imageViewer')}>
                <Avatar.Image source={image} size={50} />
              </TouchableOpacity>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Mushtaq Ahmad</Title>
                <Caption style={styles.caption}>
                  aariyanalee786@gmail.com
                </Caption>
              </View>
            </View>
          </ImageBackground>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({focused, size}) => (
                <Image source={imagePath.home} style={styles.icon} />
              )}
              label="Home"
              onPress={() => alert('Link to help')}
            />

            <DrawerItem
              icon={({focused, size}) => (
                <Image source={imagePath.cart} style={styles.icon} />
              )}
              label="Cart"
              onPress={() => {
                navigation.navigate(navigationStrings.CART);
              }}
            />

            <DrawerItem
              icon={({focused, size}) => (
                <Image source={imagePath.ic_search} style={styles.icon} />
              )}
              label="Settings"
            />
            <DrawerItem
              icon={({focused, size}) => (
                <Image source={imagePath.heart} style={styles.icon} />
              )}
              label="Support"
            />

            <DrawerItem
              icon={({focused, size}) => (
                <Image source={imagePath.ic_Qr} style={styles.icon} />
              )}
              label="Generate Qr Code"
              onPress={() => {
                navigation.navigate(navigationStrings.QR_SCREEN);
              }}
            />
            <DrawerItem
              icon={({focused, size}) => (
                <Image source={imagePath.ic_Qr} style={styles.icon} />
              )}
              label="Scan Qr Code"
              onPress={() => {
                navigation.navigate(navigationStrings.QR_SCANNER);
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    height: 120,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: colors.white,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.white,
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
  icon: {
    height: 30,
    width: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    themeColor: state.home.themeColor,
  };
};

export default connect(mapStateToProps)(DrawerContent);
