import React, { Component } from 'react';
import {View, Text, Image, WebView, ScrollView, Dimensions} from 'react-native';
import axios from 'axios'
import HTMLView from 'react-native-htmlview';

import content from './content';

class Detail extends Component {
  static navigationOptions = {
    title: '主题详情'
  }

  constructor (props) {
    super(props);
    this.state = {
      content: ''
    }
    this.id = this.props.navigation.state.params.id
  }

  getData () {
    axios.get('https://cnodejs.org/api/v1/topic/' + this.id).then((res) => {
      let data = res.data
      if (data.success === true) {
        let result = data.data;
        console.log(result.content)
        this.setState({
          content: result.content
        })
      }
    })
  }

  renderNode (node, index, defaultRenderer, parent) {
    if (node.name === 'img') {
      let src = node.attribs.src;
      if (src.indexOf('//') === 0) {
        src = 'https:' + src
      }
      if (src.indexOf('http:') === 0) {
        src = src.replace('http', 'https')
      }
      return <Image key={index} source={{uri: src}} style={{height: 100, width: Dimensions.get('window').width}} resizeMode={'contain'} />
    }
  }

  componentDidMount () {
    this.getData()
    // setTimeout(() => {
    //   this.setState({content:})
    // })
  }

  render () {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <HTMLView
            value={this.state.content}
            renderNode={this.renderNode}
          />
        </ScrollView>
      </View>
    )
  }
}

export default Detail