import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import { NavigationActions } from 'react-navigation';

import styles from './styles'


const tabFn = (text) => (
  <Text style={styles.nodeTab}>
    {text}
  </Text>
)

const Sort = (props) => {
  const { top, good, tab } = props;

  if (top) return tabFn('置顶')
  if (good) return tabFn('精华')
  return tabFn(tab)
}

const timeArr = (time) => {
  let arr = [];
  let time1 = new Date(time);
  let time2 = new Date();
  arr.push(time2.getFullYear() - time1.getFullYear());
  arr.push(time2.getMonth() - time1.getMonth());
  arr.push(time2.getDate() - time1.getDate());
  arr.push(time2.getHours() - time1.getHours());
  arr.push(time2.getMinutes() - time1.getMinutes());
  arr.push(time2.getSeconds() - time1.getSeconds());

  return arr;
}

const getTimeAgo = (time) => {
  let arrRange = timeArr(time);
  let str = '';

  for (var i=0; i<arrRange.length; i++) {
    if (arrRange[i] > 1) {
      if (i === 0) str = arrRange[i] + '年前'
      if (i === 1) str = arrRange[i] + '月前'
      if (i === 2) str = arrRange[i] + '天前'
      if (i === 3) str = arrRange[i] + '小时前'
      if (i === 4) str = arrRange[i] + '分钟前'
      if (i === 5) str = arrRange[i] + '秒前'
      break;
    }
  }

  return str;
}

const TimeAgo = (props) => {
  const { time } = props;
  let timeago = getTimeAgo(time);
  return (
    <Text style={styles.nodeSmTitle}>
      {timeago}
    </Text>
  )
}

const ArticleNodes = (props) => {
  let { data, navigation } = props;
  return (
    <TouchableOpacity style={styles.nodeBox} onPress={() => navigation.navigate('Detail', {id: data.id})}>
      <View>
        <View style={styles.nodeHeader}>
          <Image
            source={{uri: data.author.avatar_url}}
            style={styles.nodeImage}
          />
          <Sort good={data.good} top={data.top} tab={data.tab} />
          <Text style={styles.nodeTitle}>
            <Text style={styles.nodeLgTitle}>{data.author.loginname + '\n'}</Text>
            <TimeAgo time={data.last_reply_at} />
          </Text>
        </View>
        <Text style={styles.nodeText}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleNodes