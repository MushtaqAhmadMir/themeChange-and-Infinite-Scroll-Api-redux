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
  ActivityIndicator
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
    this.state = {
      search: '',
      users: [],
      isSearching: false,
      timeout: null,
      switchUsers: false,
    };
  }

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
      }, 3000),
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
