import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';

import { locatorStyle } from '../../styles/styles'
import theme from '../../styles/theme.style'

export class LocatorButtonPresentational extends Component {
    onPressHandler = () => { this.props.onPressHandler() }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.onPressHandler}>
                <View style={locatorStyle.container}>
                    <Icon name='my-location' style={locatorStyle.Icon} color={theme.ON_PRIMARY_COLOR} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default LocatorButtonPresentational