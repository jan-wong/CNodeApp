import React, { Component } from 'react';
import { createStore, combineReducers} from 'redux';
import { Provider, connect } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AppRegistry, View, Navigator, Text, Button, TextInput, Dimensions, Animated, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions, addNavigationHelpers } from 'react-navigation';

import { setAuth } from './actions';
import './component/storage';

import Home from './component/Home'
import Collect from './component/Collect'
import Message from './component/Message'
import Me from './component/Me'
import Detail from './component/Detail'
import Qrcode from './component/Qrcode'

const MainNavigator = TabNavigator({
  Home: {screen: Home},
  Collect: {screen: Collect},
  Message: {screen: Message},
  Me: {screen: Me}
}, {
  lazyLoad: true
})

const AppNavigator = StackNavigator({
  HomeNav: {screen: MainNavigator},
  Detail: {screen: Detail},
  Qrcode: {screen: Qrcode},
})

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
}

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.data
    default: 
      return state
  }
}

const appReducer = combineReducers({
  nav: navReducer,
  auth: authReducer
})

const AppWithNavigationState = connect(state => ({
  nav: state.nav
}))(({dispatch, nav}) => (
  <AppNavigator
    navigation={addNavigationHelpers({dispatch, state: nav})}
  />
))

const store = createStore(appReducer);

global.storage.load({
  key: 'accessToken'
}).then((res) => {
  console.log(res);
  store.dispatch(setAuth(res))
}).catch(err => {
  store.dispatch(setAuth({}))
})

store.subscribe(() => {
  console.log(store.getState())
})

class CNodeApp extends Component {

  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('CNodeApp', () => CNodeApp);