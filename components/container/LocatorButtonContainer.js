import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import LocatorButtonPresentational from '../presentational/LocatorButtonPresentational';
import { updateMapFeatures } from '../../redux/actions';

export class LocatorButton extends Component {


    onPressHandler = () => {
        console.log(this.props.userPosition)
        this.props.updateMapUI({
            mapUI: {
                flyToActive: true,
                coords: {
                    long: this.props.userPosition.coords.longitude,
                    lat: this.props.userPosition.coords.latitude
                }
            }
        })
    }

    render() {
        return (
            <LocatorButtonPresentational onPressHandler={this.onPressHandler} />
        )
    }
}

const mapStateToProps = (state) => ({
    userPosition: state.UI.position
})

const mapDispatchToProps = {
    updateMapUI: updateMapFeatures
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatorButton)
