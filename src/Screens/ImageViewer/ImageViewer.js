
import React, { Component } from 'react'

import { Image, Dimensions,View } from 'react-native';
 import ImageZoom from 'react-native-image-pan-zoom';
import imagePath from '../../constants/imagePath';
export default class  ImageViewer extends Component {

    render()
    {
      
    //   console.log()
    return(
        <View style={{backgroundColor:"black"}}>
         <ImageZoom cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={200}
        imageHeight={200}>
 <Image style={{width:200, height:200}}
        source={imagePath.mypic}/>
</ImageZoom>
         </View>
    )
    
}
}