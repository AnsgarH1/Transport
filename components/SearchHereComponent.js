import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';

import searchStationByCoords from '../rmvAPI/stationSearchByCoordinates'

class SearchHere extends Component {
    static propTypes = {

    }
    
    render() {
        return (
            <View style={styles.container}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    size={10}
                    title="Suche nach Halestellen in der Umgebung" 
                    />
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
        marginBottom: 4,
        padding: 4
    },
    buttonStyle: {
        
    }
})


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHere)
