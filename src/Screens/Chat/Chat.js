import { map } from 'lodash';
import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'; // 0.2.5
import { connect } from 'react-redux';
import ChatHeader from '../../Components/ChatHeader';
import imagePath from '../../constants/imagePath';
import { SOCKET_STRINGS } from '../../constants/socketStrings';
import actions from '../../redux/actions';
import socketServices from '../../utils/socketService';

 class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const{userData}=this.props
    
    
    this.getUserChats()
   
     socketServices.on(SOCKET_STRINGS.RECEIVED_MESSAGE, this.onReceiveMessage);
  }
 

  getUserChats=()=>
  {
    const {name, image, commonId, id} = this.props.route.params;
    
  
    actions
      .getUserMessgeOneToOne(commonId)
      .then((res) =>{ console.log(res.data,"chat screen")
       this.onReceiveMessage(res.data)
      const messages = res.data.map((data,key)=>
       {
         
        let message = {
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt,
          user: {
            _id: data.senderId._id,
            name: data.senderId.firstName,
            avatar: image,
          },
        };
        if (!!data.repliedToText) {
          message.replyText = data.repliedToText;
        }
        return message;
       })
       this.setState({messages})
    })
      .catch((err) => console.log(err));
  
  }
  onReceiveMessage = data => {
    // alert(JSON.stringify(data))
    // console.log(JSON.stringify(data),"recive")
    const {
      commonId,
      name,
      image,
    } = this.props.route.params;
    console.log(commonId,name,image,'hello')
    const message = {
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt,
      user: {
        _id: data.senderId,
        name: name,
        avatar: image,
      },
    };
    // console.log(data,"----------data")
    // console.log(commonConversationId,'the commonejoijoj');
    //To make sure that all the messages are seen if new message comes

    if (data.commonConversationId === commonId) {
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
   


  onSend(messages = []) {
    if (String(messages[0].text).trim().length < 1) {
      return;
    }
    const {id,commonId} = this.props.route.params;
    const {userData} = this.props;
    // To send new message
    socketServices.emit(SOCKET_STRINGS.SEND_MESSAGE, {
      senderId: userData._id,
      recieverId: id,
      commonConversationId:commonId,
      messageType: 'Text',
      text: messages[0].text,
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    const {name, image, commonId, id,isOnline} = this.props.route.params;
    const{userData}=this.props
    console.log(userData,"rtyui")
    console.log(userData._id)
    const SendButton = () => {
      return (
        <View
          style={styles.container}>
          <Image style={styles.btnWidth} source={imagePath.ic_send} />
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <ChatHeader name={name} image={image} isOnline={isOnline} />

        <GiftedChat
          children={<SendButton />}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          alwaysShowSend={true}
          user={{
            _id: userData._id
          }}
        />
      </View>
    );
  }
}
const mapStateToProps=state=>
{
  return(
{ 
  userData:state.auth.userData
}
  )
 
}
export default connect(mapStateToProps)(Chat)
const styles=StyleSheet.create({
  container:
  {
    marginHorizontal: 10,
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWidth:{height: 25, width: 25}
})