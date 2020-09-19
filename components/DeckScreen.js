import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Button from "./Button";

const DeckScreen = ({ navigation, title, count, deckId }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{count} Cards</Text>
      </View>
      <View style={styles.actions}>
        <Button
          onPress={() => {
            navigation.navigate("NewCardScreen", {
              deckId,
              deckTitle: title,
            });
          }}
          style={{ ...styles.newCard }}
        >
          Add new card
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("QuizScreen");
          }}
        >
          Start Quiz
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flex: 0,
    padding: 40,
  },
  newCard: {
    marginBottom: 10,
    backgroundColor: "tomato",
  },
  title: {
    fontSize: 30,
    marginBottom: 4,
  },
  count: {
    fontSize: 18,
    color: "gray",
  },
});

const mapStateToProps = (state, { route }) => {
  const { deckId } = route.params;
  return {
    title: state[deckId].title,
    count: state[deckId].questions.length,
    deckId,
  };
};

export default connect(mapStateToProps)(DeckScreen);
