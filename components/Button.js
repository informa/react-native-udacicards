import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: "royalblue",
        alignSelf: "center",
        borderRadius: 5,
        margin: 20,
        ...style,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
