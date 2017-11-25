import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setAuth } from '../actions';
import Camera from 'react-native-camera';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

class Qrcode extends Component {
  static navigationOptions = {
    title: '二维码扫描'
  }
  
  constructor (props) {
    super(props);
    this.data = null;
  }

  readBarCode (res) {
    if (!this.data) {
      this.data = res.data;
      console.log(res.data);
      this.request(res.data);
    }
  }

  request (data) {
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken: data
    }).then((res) => {
      let result = res.data;
      if (result.success === true) {
        console.log(result);
        let saveData = {
          token: result.id,
          name: result.loginname,
          isLogin: true
        }
        storage.save({
          key: 'accessToken',
          rawData: saveData
        })
        this.props.dispatch(setAuth(saveData))
        this.props.dispatch(NavigationActions.back())
      }
    }).catch((err) => {
      console.log(err);
      this.data = null;
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureMode={Camera.constants.CaptureMode.video}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(code) => this.readBarCode(code)}
          barCodeTypes={['org.iso.QRCode']}>
        </Camera>
      </View>
    )
  }
}

const QrcodeContainer = connect()(Qrcode)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})

export default QrcodeContainer
