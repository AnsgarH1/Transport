import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Input, Icon } from 'react-native-elements';

import { SearchStationInputStyle } from '../../styles/styles'

export class SearchStationComponentPresentational extends Component {

    searchResultsView = () => {
        if (this.props.SearchResults != null) {
            return (
                <ScrollView style={SearchStationInputStyle.scrollViewStyle}>
                    {this.props.SearchResults.map((item) => item)}
                </ScrollView>
            )
        } else {
            return (null)
        }
    }

    render() {
        return (
            <View style={SearchStationInputStyle.container}>
                <Input
                    ref={c => this._input = c}
                    inputContainerStyle={SearchStationInputStyle.inputContainer}
                    labelStyle={SearchStationInputStyle.labelStyle}

                    onChangeText={text => this.props.onChangeTextHandlerFunction(text)}
                    value={this.props.TextInput}
                    label='Haltestelle suchen:'
                    placeholder={this.props.inputPlaceholder}

                    leftIcon={<Icon name='search' size={24} />}
                    rightIcon={<Icon name='remove' type='font-awesome' size={24} onPress={this.props.onDeleteFunction} />} />

                {this.searchResultsView()}
            </View>
        )
    }
}

export default SearchStationComponentPresentational