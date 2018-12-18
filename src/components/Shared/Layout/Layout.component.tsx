import * as React from "react";
import {SafeAreaView, StyleProp, ViewStyle} from "react-native";

type Props = {
  style: StyleProp<ViewStyle>
}

export class Layout extends React.Component<Props> {
  static defaultProps = {
    style: {}
  }

  render() {
    return (
      <SafeAreaView style={[{flex: 1, backgroundColor: '#26262a'}, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    )
  }
}