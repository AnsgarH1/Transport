
import { Provider } from 'react-redux'

import React, { Component } from 'react'
import store from './redux/store'

import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import MainScreen from './screens/MainScreen'

const MainNavigator = createAppContainer(createDrawerNavigator({
  Main: { screen: MainScreen }
}))

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}