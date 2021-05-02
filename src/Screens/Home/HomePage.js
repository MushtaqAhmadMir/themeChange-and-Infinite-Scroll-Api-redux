import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import imagePath from '../../constants/imagePath';
import en from '../../constants/lang/en';
import colors from '../../styles/colors';
import actions from '../../redux/actions';
import {connect} from 'react-redux';
import fontFamily from '../../styles/fontFamily';
import commonStyles from '../../styles/commonStyles';
import socketServices from '../../utils/socketService';
// const {subscribe}=store
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      skip: 0,
      offset: 6,
      isLoading: false,
      isFetching: false,
      isNoMoreData: false,
    };
  }

  componentDidMount() {
    this.apicall();
    socketServices.initializeSocket(this.props.userData.accessToken);
  }
  apicall = (onEndReachedCall = false) => {
    const {isLoading, isNoMoreData, skip} = this.state;
    // if (!isLoading) {
    this.setState({isLoading: true});
    // }
    const limit = 6;
    const newSkip = onEndReachedCall ? this.state.users.length : 0;
    actions
      .getInfiniteItems({
        searchType: 'LEADERBOARD',
        limit: `${limit}`,
        skip: newSkip,
      })
      .then((res) => {
        let updatedStateVar = {};
        if (res.data.length > 0) {
          let newData = onEndReachedCall
            ? [...this.state.users, ...res.data]
            : res.data;

          updatedStateVar = {
            users: newData,
          };
        } else {
          updatedStateVar = {
            isNoMoreData: true,
          };
        }
        this.setState({
          ...updatedStateVar,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({isLoading: false});
      });
  };

  onEndReached = () => {
    const {isLoading, isNoMoreData} = this.state;

    if (isLoading || isNoMoreData) {
      return;
    }
    this.setState({isLoading: true});
    this.apicall(true);
  };
  renderFooter = () => {
    const {isLoading} = this.state;
    if (!isLoading) return null;

    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color="red" style={{margin: 20}} />
        ) : null}
      </View>
    );
  };

  onRefresh = () => {
    const {offset, users} = this.state;
    this.setState({isFetching: true, isNoMoreData: false});
    actions
      .getInfiniteItems({
        searchType: 'LEADERBOARD',
        limit: `6`,
        skip: '0',
      })
      .then((res) => {
        console.log(res, 'in apiiiii');
        this.setState({isFetching: false, users: res.data, offset});
      })
      .catch((err) => {
        console.log(err);
        this.setState({isFetching: false});
      });
  };
  openDrawer = () => {
    const {navigation} = this.props;
    navigation.openDrawer();
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;
    const {newThemeColor} = this.props.themeColor;

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.itemCenter}>
            <Image
              style={styles.img}
              source={{uri: item.profileImg[0].original}}
            />
            <View style={{padding: 10}}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={{fontSize: 16, color: newThemeColor}}>
                Looking For {item.lookingFor}
              </Text>
            </View>

            <Image
              style={{height: 22, width: 22, marginLeft: 70}}
              source={imagePath.loc}
            />

            {item.addressDetails.city && (
              <Text style={styles.cityText}>{item.addressDetails.city}</Text>
            )}
          </View>
        </View>
        <View style={styles.postView}>
          {item.questions[0] && (
            <Text style={styles.text2}>"{item.questions[0]}"</Text>
          )}
          <TouchableOpacity>
            <Image
              style={styles.postImg}
              source={{uri: item.profileImg[0].original}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconView}>
          <Image
            style={{height: 30, width: 30, tintColor: newThemeColor}}
            source={imagePath.ic_heart}
          />
          <Image
            style={{height: 30, width: 30, tintColor: newThemeColor}}
            source={imagePath.ic_commet}
          />
          <Image
            style={{height: 30, width: 30, tintColor: newThemeColor}}
            source={imagePath.ic_share}
          />
        </View>
      </View>
    );
  };

  render() {
    const {newThemeColor} = this.props.themeColor;
    console.log(newThemeColor, '...........');
    return (
      <View
        style={{
          backgroundColor: colors.lightGreyBg,
          flex: 1,
          paddingBottom: 40,
        }}>
        <Header
          menuIcon={imagePath.menu}
          menuPress={this.openDrawer}
          text={en.APP_TITLE}
          cartImg={imagePath.cart}
          tintColor={newThemeColor}
        />
        <View style={{borderRadius: 10, marginBottom: 45}}>
          <FlatList
            data={this.state.users}
            renderItem={this.renderItem}
            onEndReached={this.onEndReached}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.onRefresh}
            refreshing={this.state.isFetching}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.home.users,
    themeColor: state.home.themeColor,
    userData: state.auth.userData,
  };
};
export default connect(mapStateToProps)(HomePage);
const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconView: {
    backgroundColor: colors.white,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 0,
  },
  container: {
    height: 470,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  subContainer: {
    height: 80,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  itemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginLeft: 10,
  },
  name: {
    ...commonStyles.fontSize18,
    fontWeight: 'bold',
    //  fontSize: 20
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postView: {
    justifyContent: 'center',
    height: 320,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  postImg: {
    height: 300,
    width: '95%',
    margin: 10,
    borderRadius: 4,
  },
  text2: {
    marginLeft: 5,
    fontFamily: fontFamily.medium,
  },
});
