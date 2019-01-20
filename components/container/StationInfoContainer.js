import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import StationInfoPresentational from '../presentational/StationInfoPresentational';
import { updateUI, updateDepartureResults, updateStationSearchResult } from '../../redux/actions';

import { stationInfoStyle } from '../../styles/styles'
import { ListItem } from 'react-native-elements'

export class StationInfoContainer extends Component {

  departureItems = () => {
    if (this.props.departureData.Departure != null) {
      console.log("Hier", this.props.departureData)
      return (

        this.props.departureData.Departure.map((item, index) => <View style={stationInfoStyle.listItem} >
          <Text>{item.name} {"\n"} {item.direction}</Text>
        </View>)
      )
    } else {
      return (<ListItem title="keine Abfahrten" />)
    }

  }



  render() {
    if (this.props.SelectedStation.StopLocation != null) {
      return (
        <StationInfoPresentational
          stationName={this.props.SelectedStation.StopLocation.name}
          departureResults={this.departureItems()}
          selectAsStart={null}
          selectAsDestination={null}
        />
      )

    } else {
      return (
        <View>

        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  SelectedStation: state.UI.selectedStation,
  departureData: state.apiResults.DepartureResults
})

const mapDispatchToProps = dispatch => {
  return ({
    updateDepartureResults: updateDepartureResults
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(StationInfoContainer)
