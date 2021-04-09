import axios from 'axios';
import React, {Component} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
  Animated,Easing, ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import Geolocation from 'react-native-geolocation-service';
import {locationPermission} from '../../utils/permissions';
import SearchLoader from '../../Components/SearchLoader'
class Search extends Component {
  constructor() {
    super();
    // this.spinValue = new Animated.Value(0)
    // this.animatedValue = new Animated.Value(0)
    // this.springValue = new Animated.Value(0.3)
    this.state = {
      search: '',
      users: [],
      isSearching: false,
      timeout: null,
      switchUsers: false,
    };
  }
  componentDidMount () {
    // this.spin()
    // this.animate()
    // this.spring()
  }
  // spring () {
  //   this.springValue.setValue(0.3)
  //   Animated.spring(
  //     this.springValue,
  //     {
  //       toValue: 1,
  //       friction: 1
  //     }
  //   ).start()
  // }
  // spin () {
  //   this.spinValue.setValue(0)
  //   Animated.timing(
  //     this.spinValue,
  //     {
  //       toValue: 1,
  //       duration: 4000,
  //       easing: Easing.linear,
  //       // useNativeDriver:true

  //     }
  //   ).start(() => this.spin())
  // }
  // animate () {
  //   this.animatedValue.setValue(0)
  //   Animated.timing(
  //     this.animatedValue,
  //     {
  //       toValue: 1,
  //       duration: 2000,
  //       easing: Easing.linear,
  //       // useNativeDriver:true
  //     }
  //   ).start(() => this.animate())
  // }

  getSearchValue = (search) => {
    const {timeout} = this.state;
    this.setState({search: search}, () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
    this.setState({
      timeout: setTimeout(() => {
        this.hitSearchApi();
      }, 600),
    });
  };

  hitSearchApi = () => {
    const {search} = this.state;
    this.setState({isSearching: true});
    actions
      .getSearchItems(search)
      .then((res) => {
        console.log(res);
        this.setState({users: res.data,isSearching:false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({isSearching: false});
      });
  };

  switchUser = () => {
    let {switchUsers} = this.state
    this.setState({switchUsers: !switchUsers,users:[]});
  };

  hitNearbySearchApi = () => {
    this.setState({isSearching:true})
    locationPermission()
      .then((res) => {
        // console.log(res.coords);
        if (res === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
             
              console.log(position.coords);
              const {latitude,longitude} = position.coords;
              // console.log(latitude,longitude)
              actions
                .getNearbySearchItems(latitude, longitude)
                .then((res) => {
                this.setState({users:res.data,isSearching:false})
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      })
      .catch((err) => console.log(err));
  };

  renderItem = ({item}) => {
    const {newThemeColor} = this.props.themeColor;
    // console.log(item)
    return (
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.img1}
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {item.addressDetails.city}
            </Text>
          </View>
        </View>
        <View style={styles.hederView}>
          {item.questions[0] && (
            <Text style={{marginLeft: 5, fontFamily: fontFamily.medium}}>
              "{item.questions[0]}"
            </Text>
          )}
          <Image
            style={{height: 300, width: '95%', margin: 10, borderRadius: 4}}
            source={{uri: item.profileImg[0].original}}
          />
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
    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // })

    // const marginLeft = this.animatedValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 300]
    // })
    // const opacity = this.animatedValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [0, 1, 0]
    // })
    // const movingMargin = this.animatedValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [0, 300, 0]
    // })
    // const textSize = this.animatedValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [18, 32, 18]
    // })
    // const rotateX = this.animatedValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: ['0deg', '180deg', '0deg']
    // })

    console.log(this.state.search);
    const {newThemeColor} = this.props.themeColor;
    const {search, users, isSearching, switchUsers} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.whiteOpacity77}}>
        <Header
          menuIcon={imagePath.menu}
          text={'Search Api'}
          cartImg={imagePath.profile}
          tintColor={newThemeColor}
          onPress={this.switchUser}
        />
        {switchUsers ? (
          <View style={styles.searchView}>
            <TextInput
              placeholder={'Search The Users'}
              style={{padding: 10}}
              value={search}
              onChangeText={this.getSearchValue} 
            />
            
           
          </View>
        ) : (
          <TouchableOpacity
            onPress={this.hitNearbySearchApi}
            style={styles.nearbyBtn}>
            <Text style={{fontSize: 20}}>View Near By</Text>
            <Image style={{height: 30, width: 30}} source={imagePath.loc} />
          </TouchableOpacity>
        )}
        <View style={{borderRadius: 10, marginBottom: 65}}>
          <FlatList data={users} renderItem={this.renderItem} />
        </View>
        <SearchLoader isSearching={isSearching}/>
        {/* <ScrollView> */}
        {/* <Animated.Image
        style={{
          marginLeft:100,
          width: 227,
          height: 200,
          transform: [{rotate: spin}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
      <View style={styles.container}>
      <Animated.View
        style={{
          marginLeft,
          height: 30,
          width: 40,
          backgroundColor: 'red'}} />
      <Animated.View
        style={{
          opacity,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'blue'}} />
      <Animated.View
        style={{
          marginLeft: movingMargin,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'orange'}} />
      <Animated.Text
        style={{
          fontSize: textSize,
          marginTop: 10,
          color: 'green'}} >
          Animated Text!
      </Animated.Text>
      <Animated.View
        style={{
          transform: [{rotateX}],
          marginTop: 50,
          height: 30,
          width: 40,
          backgroundColor: 'black'}}>
        <Text style={{color: 'white'}}>Hello from TransformX</Text>
      </Animated.View>
    </View>
    <View style={styles.container}>
  <Text
    style={{marginBottom: 100}}
    onPress={this.spring.bind(this)}>Spring</Text>
    <Animated.Image
      style={{ width: 227, height: 200, transform: [{scale: this.springValue}] }}
      source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}/>
</View>
</ScrollView> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor: state.home.themeColor,
  };
};
export default connect(mapStateToProps)(Search);
const styles = StyleSheet.create({
  searchView: {
    height: 40,
    backgroundColor: colors.whiteOpacity77,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 150
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
    // paddingBottom:50,
  },
  cardHeader: {
    height: 80,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  img1: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  hederView: {
    justifyContent: 'center',
    height: 320,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  nearbyBtn:{
    borderWidth:.5,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
    

  }
});
