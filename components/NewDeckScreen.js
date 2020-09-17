import * as React from "react";
import { Text, View, Alert } from "react-native";
import Button from "./Button";

const NewDeckScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>New Deck Screen!</Text>
      <Button onPress={() => Alert.alert("Added a new Deck!!")}>
        Add new Deck
      </Button>
    </View>
  );
};

export default NewDeckScreen;
