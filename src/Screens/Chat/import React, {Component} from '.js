import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  moderateScaleVertical,
  moderateScale,
  width,
  height,
} from '../../styles/responsiveSize';
import {GiftedChat, Bubble, Composer, Send} from 'react-native-gifted-chat';
import Menu, {MenuItem} from 'react-native-material-menu';
import strings from '../../utilities/lang';
import moment from 'moment';
import imagePath from '../../utilities/constants/imagePath';
import fontFamily from '../../styles/fontFamily';

import colors from '../../styles/colors';
import commonStyles, {hitSlopProp} from '../../styles/commonStyles';
import socketServices from '../../utilities/socketService';
import actions from '../../actions';
import {showMessage} from 'react-native-flash-message';
import Loader from '../../components/Loader';
import {SOCKET_STRINGS} from '../../utilities/constants/constants';
import LevelUpSuccess from '../../components/LevelUpSuccess';
import types from '../../types';
import AlertModal from '../../components/AlertModal';

class Chat extends Component {
  constructor(props) {
    super(props);
    const favConv = props.route.params.favConv;
    this.state = {
      messages: [],
      currentMsg: '',
      isLoading: true,
      isLoadingEarlier: false,
      questionModal: false,
      showLevelUpModal: false,
      favConv,
      userCurrentLevel: {},
      showUploadPhotoAlert: false,
    };
  }

  componentDidMount() {
    // this.onLevelUp({level: 10});
    const {commonConversationId, _id} = this.props.route.params;
    this.setState({isLoading: true});
    this.getChatListing();
    actions.getAppData();
    actions.getChatQuestions().then(res => {
      console.log(res, 'the chat questinons---------------');
    });
    actions.currentChatIdUpdate({id: _id});
    console.log(_id, 'the _id is as follow');
    //To get a new message
    socketServices.on(SOCKET_STRINGS.RECEIVED_MESSAGE, this.onReceiveMessage);
    socketServices.on(SOCKET_STRINGS.LEVEL_UP, this.onLevelUp);
    //To get acknowledment that the sent message has been received by the user.
    socketServices.on(
      SOCKET_STRINGS.ACKNOWLEDGED_SENT_BY_RECEIVER,
      this.acknowlegmentMessageRecieve,
    );
  }
  setMenuRef = ref => {
    this._menu = ref;
  };

  onLevelUp = data => {
    console.log(data, 'hte data');
    const {levels} = this.props;
    const userCurrentLevel = levels.find(val => val.level == data.level);
    console.log(userCurrentLevel, 'the user current level');
    this.setState({showLevelUpModal: true, userCurrentLevel});
  };

  closeLevelModal = () => {
    this.setState({showLevelUpModal: false});
    setTimeout(() => {
      this.setState({showUploadPhotoAlert: true});
    }, 600);
  };

  closeUploadPhotoAlert = () => {
    this.setState({showUploadPhotoAlert: false});
    this.props.navigation.navigate("editprofile");
  };

  toggleFavorite = () => {
    const {commonConversationId, _id} = this.props.route.params;
    const {favConv} = this.state;
    this._menu.hide();
    this.setState({isLoading: true});
    //favConv is true if the user is already favourite.
    if (!favConv) {
      actions
        .markChatFavorite({
          commonConversationId,
          user2: _id,
        })
        .then(res => {
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'User marked favourite successfully.',
          });
          this.setState({isLoading: false, favConv: true});
        })
        .catch(this.errorMethod);
    } else {
      actions
        .deleteFavoriteChat({commonConversationId})
        .then(res => {
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'User marked unfavourite successfully.',
          });
          this.setState({isLoading: false, favConv: false});
        })
        .catch(this.errorMethod);
    }
  };

  showMenu = () => {
    this._menu.show();
  };

  acknowlegmentMessageRecieve = data => {};

  onReceiveMessage = data => {
    const {
      commonConversationId,
      firstName,
      profileImg,
    } = this.props.route.params;
    const message = {
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt,
      user: {
        _id: data.senderId,
        name: firstName,
        avatar: profileImg && profileImg[0].thumbnail,
      },
    };
    // console.log(data,"----------data")
    // console.log(commonConversationId,'the commonejoijoj');
    //To make sure that all the messages are seen if new message comes

    if (data.commonConversationId === commonConversationId) {
      socketServices.emit(SOCKET_STRINGS.SEEN_ALL_MESSAGES, {
        senderId: data.senderId,
        isRead: true,
        recieverId: data.recieverId,
      });

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    }
  };

  errorMethod = error => {
    this.setState({isLoading: false});
    showMessage({
      type: 'danger',
      icon: 'danger',
      message: error.message,
    });
  };

  onSend(messages = []) {
    if (String(messages[0].text).trim().length < 1) {
      return;
    }
    const {_id, commonConversationId} = this.props.route.params;
    const {userData} = this.props;
    // To send new message
    socketServices.emit(SOCKET_STRINGS.SEND_MESSAGE, {
      senderId: userData._id,
      recieverId: _id,
      commonConversationId,
      messageType: 'Text',
      text: messages[0].text,
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onSendQuestion = (text, isRandom = false) => () => {
    if (isRandom) {
      const {chatQuestions} = this.props;
      const questions = [...chatQuestions];
      const randomIndex = Math.floor(Math.random() * questions.length); //0,to length -1 index will be returned
      text = questions[randomIndex] || questions[0];
    }
    const {_id, commonConversationId} = this.props.route.params;
    const {userData} = this.props;
    socketServices.emit(SOCKET_STRINGS.SEND_MESSAGE, {
      senderId: userData._id,
      recieverId: _id,
      commonConversationId,
      messageType: 'Text',
      text: text,
    });
    var timestamp = new Date().getUTCMilliseconds() + '';
    const messages = {
      _id: timestamp,
      text: text,
      createdAt: new Date(),
      user: {
        _id: userData._id,
        name: userData.firstName,
        avatar: userData.profileImg && userData.profileImg[0].thumbnail,
      },
    };
    this.setState(previousState => ({
      questionModal: false,
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  renderBubble = props => {
    const currentMessage = props.currentMessage;
    console.log(props, 'hte props areaoijs');
    return (
      <View style={{paddingHorizontal: 16}}>
        <Bubble
          {...props}
          wrapperStyle={messageWrapperStyle}
          textStyle={messageTextStyle}
          renderCustomView={
            !!currentMessage.replyText
              ? () => {
                  return (
                    <View style={styles.questionToReplyView}>
                      <Text style={styles.questionToReplyText}>
                        {currentMessage.replyText}
                      </Text>
                    </View>
                  );
                }
              : null
          }
        />
      </View>
    );
  };

  renderFooter(props) {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>sdamdsamdlsm</Text>
      </View>
    );
  }

  backPress = () => {
    this.props.navigation.goBack(null);
  };
  _onLoadEarlier = id => {
    this.setState({isLoadingEarlier: true});
    setTimeout(() => {
      this.setState({isLoadingEarlier: false});
    }, 4000);
  };

  questionModalClose = () => {
    this.setState({questionModal: false});
  };
  questionModalOpen = () => {
    Keyboard.dismiss();
    this.setState(prevState => ({questionModal: !prevState.questionModal}));
  };

  getChatListing = () => {
    const {commonConversationId, _id} = this.props.route.params;
    actions
      .getUserMessgeOneToOne(
        `?commonConversationId=${commonConversationId}&limit=100`,
      )
      .then(res => {
        const {profileImg} = this.props.route.params;
        //To send back response that all the messages have been seen;
        socketServices.emit(SOCKET_STRINGS.SEEN_ALL_MESSAGES, {
          senderId: _id,
          isRead: true,
          recieverId: (this.props.userData && this.props.userData._id) || '',
        });
        //Initalizing the chat history
        const messages = res.data.map((data, index) => {
          let message = {
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt,
            user: {
              _id: data.senderId._id,
              name: data.senderId.firstName,
              avatar: profileImg && profileImg[0].thumbnail,
            },
          };
          if (!!data.repliedToText) {
            message.replyText = data.repliedToText;
          }
          return message;
        });
        this.setState({isLoading: false, messages});
      })
      .catch(this.errorMethod);
  };

  componentWillUnmount() {
    actions.currentChatIdUpdate({id: ''});
    socketServices.removeListener(SOCKET_STRINGS.ACKNOWLEDGED_SENT_BY_RECEIVER);
    socketServices.removeListener(SOCKET_STRINGS.RECEIVED_MESSAGE);
  }

  moveToUserdetails = () => {
    const {params} = this.props.route;
    this.props.navigation.navigate('userDetails', {
      data: params,
      hideWave: true,
      updateBackFunc: this.getChatListing,
    });
  };

  onBtnPress=()=>{
    this.setState({showUploadPhotoAlert: false});
    this.props.navigation.navigate("editprofile");
  }

  render() {
    const {params} = this.props.route;
    const {userData, appData, chatQuestions} = this.props;
    const {
      isLoading,
      isLoadingEarlier,
      questionModal,
      favConv,
      showLevelUpModal,
      userCurrentLevel,
      showUploadPhotoAlert,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.themeMain}}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <View style={styles.menuContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={this.backPress}>
                <Image
                  style={{tintColor: colors.white}}
                  source={imagePath.backBtn}
                />
              </TouchableOpacity>
              {params && params.profileImg && (
                <TouchableOpacity onPress={this.moveToUserdetails}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 20}}
                    source={{uri: params.profileImg[0].thumbnail}}
                  />
                </TouchableOpacity>
              )}
              <Text
                onPress={this.moveToUserdetails}
                style={{
                  ...commonStyles.fontBold20,
                  color: colors.white,
                  marginHorizontal: moderateScale(12),
                }}>
                {params.firstName}
              </Text>
            </View>
            <Menu
              ref={this.setMenuRef}
              button={
                <TouchableOpacity hitSlop={hitSlopProp} onPress={this.showMenu}>
                  <Image
                    style={{tintColor: colors.white}}
                    source={imagePath.moreDot}
                  />
                </TouchableOpacity>
              }>
              <MenuItem onPress={this.toggleFavorite}>
                {favConv ? 'unfavourite' : 'favourite'}
              </MenuItem>
            </Menu>
          </View>
          <View style={{flex: 1, paddingTop: 5}}>
            <GiftedChat
              messages={this.state.messages}
              extraData={{isLoadingEarlier}}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: userData._id,
              }}
              // loadEarlier
              // isLoadingEarlier={isLoadingEarlier}
              // onLoadEarlier={this._onLoadEarlier}
              isKeyboardInternallyHandled={true}
              textInputProps={{
                onFocus: () => {
                  if (questionModal) {
                    this.setState({questionModal: false});
                  }
                },
              }}
              renderBubble={this.renderBubble}
              renderAvatar={null}
              inverted={Platform.OS !== 'web'}
              onPressActionButton={this.questionModalOpen}
              // keyboardShouldPersistTaps="never"
              inputAccessoryViewID="done"
              renderFooter={() => {
                return <View style={{height: moderateScaleVertical(60)}} />;
              }}
              // bottomOffset={-300}
              renderActions={props => {
                return (
                  <TouchableOpacity
                    onPress={this.questionModalOpen}
                    style={{height: 50, width: 45, justifyContent: 'center'}}>
                    <Image
                      style={{marginLeft: 10, height: 35, width: 35}}
                      resizeMode="contain"
                      source={
                        questionModal
                          ? imagePath.dropCross
                          : imagePath.questionExpand
                      }
                    />
                  </TouchableOpacity>
                );
              }}
              // bottomOffset={50}
              textInputStyle={styles.messgeTextInput}
              renderSend={props => {
                return (
                  <Send
                    alwaysShowSend
                    containerStyle={{backgroundColor: 'red'}}
                    children={<SendButton />}
                    {...props}
                  />
                );
              }}
              renderInputToolbar={this.renderInputToolbar}
            />
          </View>
          <Loader isLoading={isLoading} />

          {questionModal && (
            <View style={commonStyles.fullScreenTransparentView}>
              <KeyboardAvoidingView
                enabled={Platform.OS == 'ios'}
                behavior="padding"
                style={
                  {
                    //  justifyContent: 'flex-end',
                    //  backgroundColor: colors.lighterBlack,
                  }
                }>
                <View style={styles.modalQuestionContainer}>
                  <View
                    style={{
                      backgroundColor: colors.lightGray,
                      padding: moderateScaleVertical(10),
                    }}>
                    <Text style={{...commonStyles.fontBold20}}>
                      Drop a question
                    </Text>
                  </View>
                  <KeyboardAwareScrollView style={{maxHeight: 200}}>
                    <TouchableOpacity
                      onPress={this.onSendQuestion('random', true)}
                      style={{
                        backgroundColor: colors.white,
                        padding: moderateScaleVertical(10),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...commonStyles.fontSize16,
                          fontFamily: fontFamily.bold,
                        }}>
                        Random{' '}
                      </Text>
                      <Image
                        style={{tintColor: colors.themeMain}}
                        source={imagePath.random}
                      />
                    </TouchableOpacity>
                    {!!chatQuestions &&
                      chatQuestions.map(val => {
                        return (
                          <TouchableOpacity
                            onPress={this.onSendQuestion(val)}
                            style={{
                              backgroundColor: colors.white,
                              padding: moderateScaleVertical(10),
                            }}>
                            <Text style={{...commonStyles.fontSize16}}>
                              {val}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </KeyboardAwareScrollView>
                </View>
              </KeyboardAvoidingView>
            </View>
          )}
          <LevelUpSuccess
            data={userCurrentLevel}
            modalVisible={showLevelUpModal}
            closeModal={this.closeLevelModal}
          />
        </View>
        {showUploadPhotoAlert && (
          <AlertModal
            visible={showUploadPhotoAlert}
            // onBtnPress={this.onBtnPress}
            // btnDisabled={false}
            withItalicText
            btnText={"Upload Photos"}
            topLabel="Level Up!"
            isImage
            centerText='Upload another photo to unlock extra waves!'
            onClose={this.closeUploadPhotoAlert}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    appData: state.home.appData,
    levels: state.levels.levels,
    chatQuestions: state.chat.chatQuestions,
  };
};

export default connect(mapStateToProps)(Chat);

const SendButton = props => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        alignSelf: 'center',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={imagePath.send} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconView: {
    height: moderateScale(48),
    width: moderateScale(48),
    backgroundColor: '#F5F5F5',
    paddingHorizontal: moderateScale(11),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: moderateScale(12),
    borderBottomEndRadius: moderateScale(12),
  },
  txtInput: {
    height: moderateScale(48),
    backgroundColor: '#F5F5F5',
    paddingHorizontal: moderateScale(11),
    marginLeft: moderateScale(16),
    borderBottomLeftRadius: moderateScale(12),
    borderTopLeftRadius: moderateScale(12),
    width: width * 0.7,
    fontFamily: fontFamily.regular,
  },
  cross: {height: moderateScale(44), width: moderateScale(44)},
  bottomView: {
    backgroundColor: colors.white,
    height: moderateScale(116),
    borderRadius: moderateScale(10),
    // padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionToReplyView: {
    backgroundColor: colors.lightGray,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  questionToReplyText: {
    fontFamily: fontFamily.regular,
    color: colors.lightBlack,
    padding: 5,
  },
  messgeTextInput: {
    backgroundColor: colors.lightGray,
    paddingTop: Platform.OS == 'ios' ? 10 : undefined,
    borderRadius: 50,
    paddingHorizontal: 20,
    // marginVertical: 30,
    textAlignVertical: 'center',
    fontFamily: fontFamily.regular,
    alignSelf: 'center',
  },
  menuContainer: {
    ...commonStyles.card,
    paddingVertical: moderateScaleVertical(14),
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.themeMain,
  },
  modalQuestionContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginHorizontal: moderateScale(8),
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
    maxHeight: 300,
  },
});
const messageWrapperStyle = {
  left: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
  },
  right: {
    backgroundColor: colors.themeMain,
    borderBottomEndRadius: 0,
  },
};
const messageTextStyle = {
  left: {
    fontFamily: fontFamily.regular,
  },
  right: {
    fontFamily: fontFamily.regular,
  },
};
// renderComposer={(props) => (
//   <View
//     style={{
//       ...commonStyles.card,
//       flexDirection: 'row',
//       borderRadius: 5,
//       paddingVertical: moderateScaleVertical(24),
//     }}>
//     <TouchableOpacity style={{marginRight: moderateScale(28),marginLeft:moderateScale(16)}}>
//       <Image source={imagePath.msg_active} />
//     </TouchableOpacity>
//     <View style={{backgroundColor:colors.lightGray,borderRadius:4,flex:1,flexDirection:"row",alignItems:'center',marginRight:moderateScale(10)}}>
//       <TextInput onChangeText={props.onTextChanged} style={{...commonStyles.fontSize15,flex:1,paddingLeft:5}} placeholder="write messagte here" />
//       <TouchableOpacity  style={{paddingHorizontal:moderateScale(15)}}>
//       <Image source={imagePath.send}/>
//       </TouchableOpacity>
//     </View>
//   </View>
// )}