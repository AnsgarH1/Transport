import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'

import { Text, Icon, Button } from 'react-native-elements'

import theme from '../../styles/theme.style'
import { stationInfoStyle } from '../../styles/styles'

export default class StationInfoPresentational extends Component {
  getListItems = () => {
    return (
      <ScrollView contentContainerStyle={stationInfoStyle.scrollViewStyleContainer}>
        {this.props.departureResults}
      </ScrollView>
    )


  }

  render() {
    return (
      <View style={stationInfoStyle.container}>
        <View style={stationInfoStyle.titleContainer}>
          <Icon name="map-marker" type="material-community" color={theme.ON_BACKGROUND_COLOR} />
          <Text style={stationInfoStyle.title}>{this.props.stationName}</Text>
        </View>
        <View style={stationInfoStyle.contentContainer}>
          <Text style={stationInfoStyle.contentText}> Abfahrten: </Text>
          {this.getListItems()}

        </View>
        <View style={stationInfoStyle.buttonContainer}>
          <Button title="Setze als Start" buttonStyle={stationInfoStyle.button} />
          <Button title="Setze als Ziel" buttonStyle={stationInfoStyle.button} />
        </View>


      </View>
    )
  }
}
