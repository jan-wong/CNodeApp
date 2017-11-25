import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const Login = connect()(({ dispatch }) => {
  return (
    <View style={styles.container}>
      <Button
        title="登录"
        onPress={() => dispatch(NavigationActions.navigate({routeName: 'Qrcode'}))}
      />
      <Text style={styles.text}>PC登录cnodejs.org后，扫描设置页的Access Token二维码即可完成登录</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    width: 200,
    lineHeight: 20,
  }
})

export default Login