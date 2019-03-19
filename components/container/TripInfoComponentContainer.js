import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



import TripInfoComponentPresentational from '../presentational/TripInfoComponentPresentational'

export class TripInfoComponentContainer extends Component {

  render() {
    return (
      <TripInfoComponentPresentational
        tripInfo={this.state.tripInfo != null ? this.state.tripInfo : null} />
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TripInfoComponentContainer
)
