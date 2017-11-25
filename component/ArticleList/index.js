import React, { Component, PropTypes } from 'react';
import { View, ListView, Text, RefreshControl } from 'react-native';

import axios from 'axios';
import ArticleNodes from './ArticleNodes'

class ArticleList extends Component {
  constructor (props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
      isRefreshing: true
    };
    this._data = [];
  }

  refresh (tag) {
    this.setState({
      isRefreshing: true
    })
    axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        page: 1,
        tab: tag,
        limit: 10,
        mdrender: false
      }
    }).then((res)=>{
      res = res.data;
      if (res.success === true) {
        this._data = res.data
        this.setState({
          ds: this.state.ds.cloneWithRows(this._data),
        });
      }
    }).catch((res) => {
      console.log(res);
    }).finally(() => {
      this.setState({
        isRefreshing: false
      })
    })
  }

  componentWillMount () {
    this.refresh(this.props.tag);
  }

  componentWillReceiveProps (nextProps) {
    this.refresh(nextProps.tag)
  }

  render () {
    const { navigation } = this.props;
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={(rowData) => <ArticleNodes data={rowData} navigation={navigation} />}
        refreshControl={<RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.refresh()}
          }
        />}
      />
    )
  }
}

export default ArticleList