import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Button from "./Button";
import colors from "../util/colors";

const ResultList = ({ data, renderItem, keyExtractor, header, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={<Text style={styles.title}>{header}</Text>}
        />
      </View>
      <View style={styles.actions}>
        <Button onPress={onPress} style={{ backgroundColor: colors.green }}>
          Start again
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    flex: 0,
    padding: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  resultsContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
    paddingTop: 14,
    marginBottom: 8,
  },
});

export default ResultList;
