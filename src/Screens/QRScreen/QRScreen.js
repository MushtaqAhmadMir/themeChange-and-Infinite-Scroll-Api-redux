
import React,{ Component } from 'react'
import { View ,Text} from 'react-native'
import QRCode from 'react-native-qrcode-svg';

export default class QRScreen extends Component{
   constructor(){
       super();
       this.state={
           value:{name:'Mushtaq Ahmad',dob:'18-11-1998',residency:'srinagar'}
           
       }
   }

    render()
    {
        const{value}=this.state
        let newString=JSON.stringify(value);
        console.log(newString,'kkkkkkkkk')
        return(
            <View style={{ flex:1,justifyContent:"center",alignItems:'center'}}>
            <Text style={{fontSize:20}}>Please SCAN QR code</Text>
 <View style={{marginTop:20}}>
 <QRCode
      value={newString}
      size={200}
      
    />
    </View>
            </View>
        )
    }
}