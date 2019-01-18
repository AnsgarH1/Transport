import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUI, createAnnotations } from '../redux/actions'
import store from '../redux/store';

import findStation from '../rmvAPI/stationSearch'
import MapFlyTo from '../mapActions/flyTo'


import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Input, Button, ListItem, Icon } from 'react-native-elements'





class SearchStationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textInput: ''
    }
    console.log(store.getState())
  }
  textChange = text => {
    this.setState({ textInput: text })
    if (text.length > 4) {
      findStation(text)
    }


  }

  selectedItemPress = (item) => {
    const selectedItem = {
      selectedStation: {
        name: item.StopLocation.name,
        extID: item.StopLocation.extId,
        coordinates: {
          lat: item.StopLocation.lat,
          long: item.StopLocation.lon
        }
      }
    }

    const newAnnotation = {
      "type": "FeatureCollection",
      "features": [
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      item.StopLocation.lon,
                      item.StopLocation.lat
                  ]
              }
          }
      ]
  
  }
    console.log("HIER --------")
    console.log(item)



    store.dispatch(createAnnotations(newAnnotation))
    store.dispatch(updateUI(selectedItem))

    MapFlyTo(item.StopLocation.lon, item.StopLocation.lat)
    
    console.log("new State: ", store.getState())
  }

  searchResultsView = () => {
    const StationSearchResults = this.props.searchResults.stopLocationOrCoordLocation
    console.log(StationSearchResults)
    if (StationSearchResults != null && this.state.textInput.length > 3) {
      console.log(StationSearchResults)

      return (
        <ScrollView style={{ padding: 4, width: '100%', height: 200 }}>
          {
            StationSearchResults.map((item, index) => (<ListItem onPress={() => { this.selectedItemPress(item) }} containerStyle={{ margin: 1 }} key={index} title={item.StopLocation.name} />))
          }
        </ScrollView>
      )

    } else {
      return (<View></View>)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.state.textInput}
          inputContainerStyle={styles.inputContainer}
          label='Haltestelle suchen:'
          placeholder='Wiesbaden Hbf'
          onChangeText={text => { this.textChange(text) }}
          leftIcon={<Icon name='search' size={24} />}
          rightIcon={<Icon name='remove' type='font-awesome' size={24} onPress={() => this.setState({ textInput: '' })} />}
        />
        {
          this.searchResultsView()
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderRadius: 5,
    borderColor: '#c0c0c0',
    borderWidth: 1,

    padding: 4
  },
  inputContainer: {
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => {
  return {
    searchResults: state.apiResults.StationSearchResults
  }
}

export default connect(mapStateToProps)(SearchStationComponent)