import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import TabNavigation from "./screens/TabNavigation";
import DeckScreen from "./screens/DeckScreen";
import NewCardScreen from "./screens/NewCardScreen";
import QuizScreen from "./screens/QuizScreen";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import colors from "./util/colors";
import { setLocalNotification } from "./util/helpers";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.blue,
  },
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <PaperProvider theme={theme}>
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
        </PaperProvider>
      </Provider>
    );
  }
}
