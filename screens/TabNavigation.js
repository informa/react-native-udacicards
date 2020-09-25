import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DeckListScreen from "./DeckListScreen";
import NewDeckScreen from "./NewDeckScreen";

const ios = Platform.OS === "ios";
const Tab = ios ? createBottomTabNavigator() : createMaterialTopTabNavigator();

const TabNavigation = () => {
  const iosTabStyle = ios && {
    tabStyle: {
      height: 50,
    },
  };

  const iosTabBarStyle = ios && {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const tabConfig = {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      ...iosTabStyle,
      activeTintColor: Platform.OS === "ios" ? "dodgerblue" : "white",
      pressColor: "skyblue",
      indicatorStyle: {
        backgroundColor: "yellow",
      },
      style: {
        ...iosTabBarStyle,
        flex: 0,
        height: Platform.OS === "ios" ? 100 : 56,
        backgroundColor: Platform.OS === "ios" ? "white" : "royalblue",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  };

  const TabRouteConfig = {
    DeckListScreen: {
      name: "Deck",
      component: DeckListScreen,
      options: {
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-bookmarks" size={30} color={color} />
        ),
      },
    },
    NewDeckScreen: {
      component: NewDeckScreen,
      name: "New deck",
      options: {
        tabBarIcon: ({ color }) => (
          <FontAwesome name="plus-square" size={30} color={color} />
        ),
      },
    },
  };

  return (
    <Tab.Navigator {...tabConfig}>
      <Tab.Screen {...TabRouteConfig["DeckListScreen"]} />
      <Tab.Screen {...TabRouteConfig["NewDeckScreen"]} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
