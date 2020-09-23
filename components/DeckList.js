import * as React from "react";
import { TouchableWithoutFeedback, StyleSheet, Animated } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

const DeckList = ({ title, count, id, screen, ...props }) => {
  const scale = new Animated.Value(1);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        Animated.spring(scale, {
          toValue: 0.9,
          speed: 1,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scale, {
          toValue: 1,
          speed: 50,
          useNativeDriver: true,
        }).start();
      }}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale }],
            ...styles.deckList,
          },
        ]}
      >
        <Card>
          <Card.Title
            title={title}
            subtitle={`${count} cards`}
            right={() => (
              <IconButton
                icon={() => (
                  <Entypo name="chevron-right" size={24} color="black" />
                )}
                onPress={() => {
                  props.navigation.navigate(screen, {
                    deckId: id,
                    deckTitle: title,
                    deckCount: count,
                  });
                }}
              />
            )}
          />
        </Card>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  deckList: {
    marginTop: 8,
  },
});

export default DeckList;
