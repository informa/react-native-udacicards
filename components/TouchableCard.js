import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";

const TouchableCard = ({ onPress, label, buttonText, front, back }) => {
  const frontCardStyles = front && {
    backgroundColor: "white",
  };
  const backCardStyles = back && {
    backgroundColor: "deepskyblue",
  };
  const backLabelStyles = back && {
    color: "white",
  };
  const backButtonStyles = back && {
    color: "black",
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ flex: 1 }}>
      <Card style={[styles.card, { ...frontCardStyles, ...backCardStyles }]}>
        <View style={styles.cardContent}>
          <Text style={[styles.cardLabel, { ...backLabelStyles }]}>
            {label}
          </Text>
          <Button {...backButtonStyles}>{buttonText}</Button>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabel: {
    marginBottom: 12,
    textAlign: "center",
    fontSize: 24,
  },
});

export default TouchableCard;
