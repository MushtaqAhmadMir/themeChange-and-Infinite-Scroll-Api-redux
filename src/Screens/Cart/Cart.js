import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {BarChart, Grid,PieChart,LineChart,AreaChart} from 'react-native-svg-charts'
import StatusBar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import * as shape from 'd3-shape';


export default class extends Component {
state={
    fill : 'rgb(134, 65, 244)',
     data : [50, 10, 40, 95, -4, -24, 85, 0, 35, 53, -53, 24, 50, -20, -80]
}

randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
 
 pieData = this.state.data
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: this.randomColor(),
            onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
    }))
 
  render() {
      const{data,fill}=this.state
    return (
      <View style={{flex: 1}}>
        <StatusBar bgcolor={'red'} />
        <Header
          text={'Graphs'}
          tintColor={colors.textBlue}
          menuIcon={imagePath.menu}
        />
        <ScrollView>

<BarChart style={{ height: 200 }} data={data} svg={{fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart>
            <PieChart style={styles.pieChart} data={this.pieData} />
            <LineChart
                style={styles.pieChart}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
            <AreaChart
          style={styles.pieChart}
          data={data}
          contentInset={{top: 30, bottom: 30}}
          curve={shape.curveNatural}
          svg={{fill}}>
          <Grid />
        </AreaChart>
            </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    pieChart: {
      height: 300,
      width: 300,
      marginHorizontal: 30,
      alignSelf:"center"
    },
    title: {
      textAlign: 'center',
      color: colors.themeColor,
      fontFamily: fontFamily.mainfont,
      marginVertical: 10,
      marginTop: 20,
      fontSize: 20,
    },
   
  });