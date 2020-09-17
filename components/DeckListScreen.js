import * as React from "react";
import { Text, View, Alert } from "react-native";
import Button from "./Button";

const DeckScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>Deck List!</Text>
      <Button
        onPress={() => {
          navigation.navigate("DeckScreen");
        }}
      >
        Go to deck
      </Button>
    </View>
  );
};

export default DeckScreen;
