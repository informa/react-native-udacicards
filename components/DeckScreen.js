import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Button from "./Button";
import {
  Card,
  Avatar,
  Paragraph,
  Caption,
  Headline,
  Button as ButtonPaper,
} from "react-native-paper";

const DeckScreen = ({ navigation, title, count, id }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.content}>
        <Card.Content
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Headline style={{ fontSize: 30 }}>{title}</Headline>
        </Card.Content>
        <Card.Actions
          style={{
            justifyContent: "space-between",
          }}
        >
          <ButtonPaper
            color="royalblue"
            onPress={() => {
              navigation.navigate("NewCardScreen", {
                deckId: id,
              });
            }}
          >
            Add new card
          </ButtonPaper>
          <Caption style={{ fontSize: 16 }}>{count} Cards</Caption>
        </Card.Actions>
      </Card>
      <View style={styles.actions}>
        <Button
          onPress={() => {
            navigation.navigate("QuizScreen", {
              deckId: id,
            });
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  content: {
    flex: 1,
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
    id: deckId,
  };
};

export default connect(mapStateToProps)(DeckScreen);
