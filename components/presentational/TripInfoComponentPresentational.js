import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'

import { tripInfoStyle } from '../../styles/styles'
import { ListItem } from 'react-native-elements';

export class TripInfoComponentPresentational extends Component {

    renderTripInfo = () => {
        if (this.props.tripData != null) {

            return (<View>

                {this.props.tripData.map(item => {
                    return (
                        <View>
                            <View>
                                <Text>Start: Start1</Text>
                                <Text></Text>
                            </View>
                            <Text>{item.origin} -> {item.destination}</Text>

                            <Text>{item.originTime} -> {item.destinationTime}</Text>
                            
                        </View>
                    )
                })}
                <Text>Test</Text>
            </View>)
        } else {
            return (<View></View>)
        }
    }

    render() {
        return (
            <View style={tripInfoStyle.container}>
                {this.renderTripInfo()}
            </View>
        )
    }
}

export default TripInfoComponentPresentational