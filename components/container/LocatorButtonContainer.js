import React, { Component } from 'react'
import { connect } from 'react-redux'
import LocatorButtonPresentational from '../presentational/LocatorButtonPresentational';
import { activateMapFlyTo } from '../../redux/actions/uxActions';

export class LocatorButton extends Component {

    componentDidUpdate() {
        console.log(this.props.state)
    }
    onPressHandler = () => {
        const coords = {
            long: this.props.userPosition.longitude,
            lat: this.props.userPosition.latitude
        }
        this.props.mapFlyTo(coords)
    }

    render() {
        return (
            <LocatorButtonPresentational onPressHandler={this.onPressHandler} />
        )
    }
}

const mapStateToProps = (state) => ({
    userPosition: state.UserData.position,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    mapFlyTo: (coords) => dispatch(activateMapFlyTo(coords))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocatorButton)
