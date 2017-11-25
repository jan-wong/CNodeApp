import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, RefreshControl, Image } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { connect } from 'react-redux';
import Login from './Login'

const CollectList = (props) => {
  const { data } = props;
  return (
    <View style={styles.collectBox}>
      <Image
        source={{uri: data.author.avatar_url}}
        style={styles.collectImage}
      />
      <Text style={[styles.collectText, styles.collectTextCount]}>{data.reply_count}{'/'}{data.visit_count}</Text>
      <Text style={styles.collectText}>{data.title}</Text>
    </View>
  )
}

class CollectBox extends Component {
  constructor (props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      hasMessages: true,
      isRefresh: true,
      ds
    }
  }

  getMessage (name) {
    axios.get(`https://cnodejs.org/api/v1/topic_collect/${name}`).then((res) => {
      let result = res.data;
      console.log(result);
      if (result.success === true) {
        let data = result.data;

        if (data.length > 0) {
          this.setState({
            ds: this.state.ds.cloneWithRows(data),
            isRefresh: false
          })
        } else {
          thi.setState({
            isRefresh: false,
            hasMessages: false
          })
        }
      }
    })
  }

  componentDidMount () {
    const { name } = this.props;
    this.getMessage(name);
  }

  render () {
    const { name } = this.props;
    if (this.state.hasMessages) {
      return (
        <ListView
          dataSource={this.state.ds}
          renderRow={(rowData) => <CollectList data={rowData} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefresh}
              onRefresh={() => {
                this.setState({
                  isRefresh: true
                })
                this.getMessage(name)
              }}
            />
          }
        />
      )
    }
    return (
      <View style={styles.noMessages}>
        <Text>没有收藏</Text>
      </View>
    )
  }
}

const Collect = connect(state => ({
  auth: state.auth
}))(({dispatch, auth}) => {
  if (auth.isLogin) {
    return <CollectBox name={auth.name} />
  }
  return <Login />
})

Collect.navigationOptions = {
  title: '收藏',
  tabBar: {
    label: '收藏',
    icon: ({tintColor}) => <Ionicons size={26} name="ios-pricetag" color={tintColor} />
  }
}

const styles = StyleSheet.create({
  noMessages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectBox: {
    marginTop: 5,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  collectImage: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  collectText: {
    height: 40,
    lineHeight: 40,
  },
  collectTextCount: {
    color: '#ccc',
    marginRight: 5,
    fontSize: 12,
  }
})

export default Collect