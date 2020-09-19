import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ children, onPress, style = {}, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.disabled && { backgroundColor: "lightgray" },
        { ...style },
      ]}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "royalblue",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 20,
    padding: 10,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: "center",
  },
});

export default Button;
