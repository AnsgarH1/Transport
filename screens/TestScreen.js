import React, { Component } from 'react'
import { View, Text} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapContainer  from '../components/container/MapContainer'

export class TestScreen extends Component {
  static propTypes = {
    
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 100}}>
        <MapContainer/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen)
