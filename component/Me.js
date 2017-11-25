import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { setAuth } from '../actions';
import { NavigationActions } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Login from './Login';

const MeList = connect()(({dispatch, data}) => {
  const logout = () => {
    global.storage.remove({
      key: 'accessToken'
    })
    dispatch(setAuth({}));
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'HomeNav'})
      ]
    }))
  }

  return (
    <View>
      <View style={[styles.list, styles.avatar]}>
        <Image
          source={{uri: data.avatar_url}}
          style={styles.userImage}
        />
        <Text style={styles.name}>{data.loginname}</Text>
      </View>
      <View style={[styles.list, styles.logout]}>
        <TouchableOpacity
          onPress={logout}
        >
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

class MeBox extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  componentWillMount () {
    const { name } = this.props;
    this.getData(name);
  }

  getData (name) {
    axios.get(`https://cnodejs.org/api/v1/user/${name}`).then((res) => {
      let result = res.data;
      console.log(result)
      if (result.success === true) {
        this.setState({
          data: result.data
        })
      }
    })
  }

  render () {
    return (
      <MeList data={this.state.data} />
    )
  }
}

const Me = connect(state => ({
  auth: state.auth
}))(({dispatch, auth}) => {
  if (auth.isLogin) {
    return <MeBox name={auth.name} />
  }
  return <Login />
})

Me.navigationOptions = {
  title: '我',
  tabBar: {
    label: '我',
    icon: ({tintColor}) => <Ionicons size={26} name="ios-contact" color={tintColor} />
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
  },
  name: {
    lineHeight: 40
  },
  avatar: {
    flexDirection: 'row',
  },
  userImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logout: {
    padding: 15
  },
  logoutText: {
    textAlign: 'center',
    color: '#333',
  }
})

export default Me