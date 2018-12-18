import * as React from "react";
import {Text, TouchableOpacity} from "react-native";

type Props = {
  content: string | React.Component,
  onPress?: () => void,
  width?: number | string,
  contentColor?: string,
  disabled?: boolean,
  color?: string
}

export class Button extends React.Component<Props> {
  static defaultProps: Props = {
    content: '',
    onPress: () => null,
    contentColor: '#e8ebee',
    disabled: false
  }

  render() {
    const {content, onPress, width, contentColor, color} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{padding: 20, backgroundColor: color || '#896fd9', borderRadius: 5, width}}
      >
        {
          content.constructor === String ?
            <Text style={{color: contentColor}}>{content}</Text> : {content}
        }
      </TouchableOpacity>
    )
  }
}