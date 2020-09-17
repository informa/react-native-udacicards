import * as React from "react";
import { Text, View, Alert } from "react-native";
import Button from "./Button";

const NewCardScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>New Card Screen!</Text>
      <Button onPress={() => Alert.alert("Added a new card!!")}>
        Add card
      </Button>
    </View>
  );
};

export default NewCardScreen;
