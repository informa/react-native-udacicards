import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Button from "../components/Button";
import {
  Card,
  Caption,
  Headline,
  Button as ButtonPaper,
} from "react-native-paper";

const DeckScreen = ({ navigation, title, count, id }) => {
  const hasCards = count > 0;
  return (
    <View style={styles.container}>
      <Card style={{ flex: 1 }}>
        <Card.Content style={styles.content}>
          <Headline style={{ fontSize: 30, marginBottom: 10 }}>
            {title}
          </Headline>
          <Caption style={{ fontSize: 16 }}>{count} Cards</Caption>
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
        </Card.Content>
      </Card>
      {hasCards && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
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
