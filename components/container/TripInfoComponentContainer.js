import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



import TripInfoComponentPresentational from '../presentational/TripInfoComponentPresentational'

export class TripInfoComponentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tripData: null,
      apiTripData: this.props.tripData
    }
  }
  componentDidUpdate() {

    if (this.state.apiTripData != this.props.tripData) {
      this.formatTripData()
    }
  }

  formatTripData = () => {

    try {



      if (this.props.tripData != null && this.props.tripData.Trip[0] != null) {
        tripResult = []

        this.props.tripData.Trip[0].LegList.Leg.forEach((item) => {
          tripResult.push({
            origin: item.Origin.name,
            originTime: item.Origin.time,
            destination: item.Destination.name,
            destinationTime: item.Destination.time,
            type: item.type,
            direction: item.direction,
            name: item.name
          })

        })

        this.setState({ tripData: tripResult, apiTripData: this.props.tripData })
        console.log("HIER-->", tripResult)

      }

    } catch (error) {
      console.log("Fehler", error)
    }

    resetTripData = () => {
      this.setState({ tripData: null })
    }


  }

  

  render() {
    if (this.state.tripData != null) {


      return (
        <TripInfoComponentPresentational
          tripData={this.state.tripData}
          resetTripData={() => this.resetTripData}
        />
      )
    } else {
      return (<View></View>)
    }
  }
}

const mapStateToProps = (state) => ({
  tripData: state.ApiResults.TripResults
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TripInfoComponentContainer
)
