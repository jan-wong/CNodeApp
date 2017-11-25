import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ListView, RefreshControl, TouchableOpacity } from 'react-native';

import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import Login from './Login'

const ReadList = connect()(({data, dispatch}) => {
  const { author, topic, type } = data;
  const handle = () => {
    dispatch(NavigationActions.navigate({routeName: 'Detail', params: {id: topic.id}}))
  }

  if (type === 'at') {
    return (
      <Text style={styles.readBox}>
        <Text style={styles.readTextOn}>{author.loginname}</Text>
        <Text>{' 在话题 '}</Text>
        <Text style={styles.readTextOn} onPress={handle}>{topic.title}</Text>
        <Text>{' 中@了你'}</Text>
      </Text>
    )
  }
  return (
    <Text style={styles.readBox}>
      <Text style={styles.readTextOn}>{author.loginname}</Text>
      <Text>{' 回复了你的话题 '}</Text>
      <Text style={styles.readTextOn} onPress={handle}>{topic.title}</Text>
    </Text>
  )
})

class UnRead extends Component {
  static navigationOptions = {
    tabBar: {
      label: '未读消息'
    }
  }

  constructor (props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      ds,
      isRefresh: true,
      hasMessages: true
    }
  }

  getMessage (token) {
    axios.get('https://cnodejs.org/api/v1/messages', {
      params: {
        accesstoken: token,
        mdrender: false
      }
    }).then((res) => {
      let result = res.data;
      console.log(result);
      if (result.success === true) {
        let hasnotReadMessages = result.data.hasnot_read_messages;

        if (hasnotReadMessages.length > 0) {
          this.setState({
            isRefresh: false,
            ds: this.state.ds.cloneWithRows(result.data.hasnot_read_messages)
          })
        } else {
          this.setState({
            isRefresh: false,
            hasMessages: false
          })
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  componentDidMount () {
    const { token } = this.props.screenProps;
    this.getMessage(token);
  }

  render () {
    const { token } = this.props.screenProps;
    if (this.state.hasMessages) {
      return (
        <ListView
          dataSource={this.state.ds}
          renderRow={(rowData) => <ReadList data={rowData} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefresh}
              onRefresh={() => {
                this.setState({
                  isRefresh: true
                })
                this.getMessage(token)
              }}
            />
          }
        />
      )
    }
    return (
      <View style={styles.noMessages}>
        <Text>没有未读消息</Text>
      </View>
    )    
  }
}

class Readed extends Component {
  static navigationOptions = {
    tabBar: {
      label: '已读消息'
    }
  }

  constructor (props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      ds,
      isRefresh: true,
      hasMessages: true
    }
  }

  getMessage (token) {
    axios.get('https://cnodejs.org/api/v1/messages', {
      params: {
        accesstoken: token,
        mdrender: false
      }
    }).then((res) => {
      let result = res.data;
      console.log(result);
      if (result.success === true) {
        let hasReadMessages = result.data.has_read_messages;

        if (hasReadMessages.length > 0) {
          this.setState({
            isRefresh: false,
            ds: this.state.ds.cloneWithRows(result.data.has_read_messages)
          })
        } else {
          this.setState({
            isRefresh: false,
            hasMessages: false
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    console.log(this.props)
    const { token } = this.props.screenProps;
    this.getMessage(token);
  }

  render () {
    const { token } = this.props.screenProps;
    if (this.state.hasMessages) {
      return (
        <ListView
          dataSource={this.state.ds}
          renderRow={(rowData) => <ReadList data={rowData} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefresh}
              onRefresh={() => {
                this.setState({
                  isRefresh: true
                })
                this.getMessage(token)
              }}
            />
          }
        />
      )
    }
    return (
      <View><Text>没有已读消息</Text></View>
    )    
  }
}

const MessageNavigator = TabNavigator({
  UnRead: {screen: UnRead},
  Readed: {screen: Readed}
}, {
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

const Message = connect(state => ({
  auth: state.auth
}))(({dispatch, auth}) => {
  if (auth.isLogin) {
    return <MessageNavigator screenProps={{token: auth.token}} />
  }
  return <Login />
})

Message.navigationOptions = {
  title: '消息',
  tabBar: {
    label: '消息',
    icon: ({tintColor}) => <Ionicons size={26} name="ios-mail" color={tintColor} />
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 35,
  },
  noMessages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readBox: {
    marginTop: 5,
    backgroundColor: '#fff',
    padding: 10,
    lineHeight: 24,
  },
  readTextOn: {
    color: '#80bd01',
    borderWidth: 1,
    borderColor: 'red'
  }
})

export default Message