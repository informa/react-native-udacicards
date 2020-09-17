import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./components/TabNavigation";
import DeckScreen from "./components/DeckScreen";
import NewCardScreen from "./components/NewCardScreen";
import QuizScreen from "./components/QuizScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UdaciCards">
          <Stack.Screen name="UdaciCards" component={TabNavigation} />
          <Stack.Screen
            name="DeckScreen"
            options={{ title: "Deck" }}
            component={DeckScreen}
          />
          <Stack.Screen
            name="NewCardScreen"
            options={{ title: "Add Card" }}
            component={NewCardScreen}
          />
          <Stack.Screen
            name="QuizScreen"
            options={{ title: "Quiz" }}
            component={QuizScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
