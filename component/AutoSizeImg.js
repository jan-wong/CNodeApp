import React from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export default class AutoSizedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set width 1 is for preventing the warning
      // You must specify a width and height for the image %s
      width: 1,
      height: 1,
    };
  }

  componentDidMount() {
    console.log(this.props)
    Image.getSize(this.props.source.uri, (w, h) => {
      this.setState({width: w, height: h});
    });
  }

  render() {
    const finalSize = {};
    if (this.state.width > width) {
      finalSize.width = width;
      const ratio = width / this.state.width;
      finalSize.height = this.state.height * ratio;
    }
    const style = Object.assign(
      {},
      this.state,
      finalSize
    );
    const source = Object.assign({}, this.props.source)
    // if (!finalSize.width || !finalSize.height) {
    //   source = Object.assign(source, this.props.source, this.state);
    // } else {
    //   source = Object.assign(source, this.props.source, finalSize);
    // }
    console.log(source)
    console.log(style)
    return <Image style={style} source={source} />;
  }
}
