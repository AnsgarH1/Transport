import React, { Component } from 'react'

import { connect } from 'react-redux'
import { updateStationSearchResult, updateUI, updateMapFeatures, } from '../../redux/actions';

import SearchStationComponentPresentational from '../presentational/SearchStationComponentPresentational';
import { ListItem } from 'react-native-elements';

import store from '../../redux/store'

class SearchStationContainer extends Component {
    state = {
        TextInput: '',

    }

    onChangeTextHandler = (text) => {
        this.setState({
            TextInput: text
        })
        this.getStationResults(text)
    }
    onDeleteHandler = () => {
        this.setState({
            TextInput: null,
            listItems: null
        })
    }

    getStationResults = async (stationName = '') => {
        apiUrl = 'https://www.rmv.de/hapi/location.name?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&type=S&input=' + stationName;

        await fetch(apiUrl, { method: 'GET' })
            .then((response) => response.json())
            .then((response) => {
                this.props.updateResults(response)
            })
            .catch((error) => {
            });

        this.createListItems()

    }


    createListItems = () => {
        if (this.state.TextInput.length > 0 && this.props.SearchResults != null) {
            let listItems = this.props.SearchResults.stopLocationOrCoordLocation.map((item, index) => {
                return (<ListItem onPress={() => { this.onItemSelection(item) }} key={'id_' + index} containerStyle={{ margin: 1 }} title={item.StopLocation.name} />)
            })
            this.setState({ listItems })
        } else {
            this.setState({ listItems: null })
        }
    }

    onItemSelection = item => {
        this.setState({TextInput: item.StopLocation.name})
        item.flyToSelected = true
        this.props.updateUserInfo({ selectedStation: item})
        
        
        console.log(store.getState())
    }

    render() {
        return (
            <SearchStationComponentPresentational
                TextInput={this.state.TextInput}
                onChangeTextHandlerFunction={this.onChangeTextHandler}
                onDeleteFunction={this.onDeleteHandler}
                inputPlaceholder='Wiesbaden Hauptbahnhof'
                SearchResults={this.state.listItems != null ? this.state.listItems : null}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    SearchResults: state.apiResults.StationSearchResults
})


const mapDispatchToProps = ({
    updateResults: updateStationSearchResult,
    updateUserInfo: updateUI,
    updateMapFeature: updateMapFeatures
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchStationContainer)
