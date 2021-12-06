import React, { Component } from 'react'
import {Button, View, Image, ImageBackground, Text,Dimensions, Platform,TouchableOpacity,StyleSheet,Alert } from "react-native";
import { PieChart } from 'react-native-svg-charts'


export default class App extends Component {

    

  constructor(props){
    super(props);
    this.state = {
        selectedSlice: {
            label: '',
            value: '',
        },
        labelWidth: 0
    }
}
      state = {
        height: 0,
        width: 0,
    }

      
    render() {
      const {labelWidth, selectedSlice} = this.state;
      const {label, value} = selectedSlice;
      const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter','aa','ss'];
      const values = [35, 30, 30, 30, 30,30,30];
      const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff','red','yellow'];
      const data = keys.map((key, index) => {
          return {
              key,
              value: values[index],
              svg: {fill: colors[index]},
              arc: {outerRadius: label === key ? '100%' : '90%', padAngle: 0},
              onPress: () => {this.setState({selectedSlice: {label: key, value: values[index]}}); console.log(key, index)}
          }
      })

      const deviceWidth = Dimensions.get('window').width

      return (
          <View style={{ justifyContent: 'center', flex: 1 }}>
              <PieChart
                  style={{ height: 400 }}
                  outerRadius={ '100%' }
                  innerRadius={ '20%' }
                  data={data}
              />

              <Text
                  onLayout={({ nativeEvent: { layout: { width }}}) => {
                  this.setState({ labelWidth: width});
              }}
                  style={{
                  position: 'absolute',
                  left: deviceWidth / 2 - labelWidth / 2,
                  textAlign: 'center'
              }}>
                   {`${label} \n ${value}`} 
              </Text>
          </View>
      )
  }
}
