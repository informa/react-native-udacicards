import * as React from "react";
import { Text, View, Alert } from "react-native";
import Button from "./Button";

const DeckScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>Deck Screen!</Text>
      <Button
        onPress={() => {
          navigation.navigate("NewCardScreen");
        }}
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
  );
};

export default DeckScreen;
