import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

const DeckList = ({ title, count }) => {
  return (
    <View style={styles.deckList}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count} cards</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  deckList: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  count: {
    fontSize: 16,
    color: "gray",
  },
});

export default DeckList;
