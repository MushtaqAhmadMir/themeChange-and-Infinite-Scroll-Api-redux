import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';

class ChatRow extends Component {
  state = {
    userList: [],
    isLoading: true,
  };

  componentDidMount() {
    actions
      .chatList(10, 0)
      .then((res) => {
        console.log(res);
        this.setState({userList: res.data, isLoading: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({isLoading: false});
      });
  }
  renderItem = (item) => {
    console.log(item);
    const {userInfo, commonConversationId, _id} = item.item;
    const {fullName, isOnline, lookingFor} = userInfo;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(navigationStrings.CHAT, {
            name: fullName,
            image: userInfo.profileImg[0].original,
            commonId: commonConversationId,
            id: _id,
            isOnline: isOnline,
          })
        }>
        <View style={styles.container1}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={{uri: userInfo.profileImg[0].original}}
            />

            <View style={styles.subContainer}>
              <Text style={styles.name}>{fullName}</Text>
              <Text>Loking For {lookingFor}</Text>
            </View>
          </View>
          <View>
            {isOnline ? (
              <Text style={styles.textOnline}>{strings.ONLINE}</Text>
            ) : (
              <Text>Offline</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {newThemeColor} = this.props.themeColor;
    const {userList} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header
          text={'Chats'}
          tintColor={newThemeColor}
          menuIcon={imagePath.menu}
        />
        <FlatList renderItem={this.renderItem} data={userList} />
        <Loader isLoading={this.state.isLoading} />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.home.users,
    themeColor: state.home.themeColor,
  };
};
export default connect(mapStateToProps)(ChatRow);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  container1: {
    flex: 1,
    height: 80,
    backgroundColor: colors.white,
    margin: 2,
    padding: 10,
    flexDirection: 'row',
    // justifyContent:"center",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textGrey,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  subContainer: {
    marginLeft: 10,
  },
  name: {
    ...commonStyles.fontSize18,
  },
  textOnline: {color: colors.green, padding: 10},
});
