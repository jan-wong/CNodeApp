import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ArticleList from './ArticleList'

class All extends Component {
  static navigationOptions = {
    tabBar: {
      label: '全部'
    }
  }

  render () {
    return (
      <View>
        <ArticleList tag="all" navigation={this.props.navigation}/>
      </View>
    )
  }
}

class Good extends Component {
  static navigationOptions = {
    tabBar: {
      label: '精华'
    }
  }

  render () {
    return (
      <View>
        <ArticleList tag="good" navigation={this.props.navigation}/>
      </View>
    )
  }
}

class Share extends Component {
  static navigationOptions = {
    tabBar: {
      label: '分享'
    }
  }

  render () {
    return (
      <View>
        <ArticleList tag="share" navigation={this.props.navigation}/>
      </View>
    )
  }
}

class Ask extends Component {
  static navigationOptions = {
    tabBar: {
      label: '问答'
    }
  }

  render () {
    return (
      <View>
        <ArticleList tag="ask" navigation={this.props.navigation}/>
      </View>
    )
  }
}

class Job extends Component {
  static navigationOptions = {
    tabBar: {
      label: '招聘'
    }
  }

  render () {
    return (
      <View>
        <ArticleList tag="job" navigation={this.props.navigation}/>
      </View>
    )
  }
}

const HomeNavigator = TabNavigator({
  All: {screen: All},
  Good: {screen: Good},
  Share: {screen: Share},
  Ask: {screen: Ask},
  Job: {screen: Job}
}, {
  lazyLoad: true,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
      height: 35,
    },
    labelStyle: {
      fontSize: 14,
      marginBottom: 10,
    }
  }
})

HomeNavigator.navigationOptions = {
  title: '首页',
  tabBar: {
    label: '首页',
    icon: ({tintColor}) => <Ionicons size={26} name="ios-home" color={tintColor} />
  }
}

export default HomeNavigator