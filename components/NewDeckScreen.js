import * as React from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import shortid from "shortid";
import { saveDeckTitle } from "../util/api";
import { addNewDeck } from "../actions";
import Button from "./Button";
import { Card, Headline } from "react-native-paper";

class NewDeckScreen extends React.Component {
  state = {
    inputValue: undefined,
    inputError: false,
  };

  handleSubmit = (text) => {
    const { goBack, addDeck } = this.props;
    const id = shortid.generate();

    if (text !== "") {
      // dispatch
      addDeck({
        [id]: {
          id,
          title: text,
          questions: [],
        },
      });

      // reset state
      this.setState({ inputValue: undefined, inputError: false });

      // go to home
      goBack();

      // add to local storage
      saveDeckTitle({ id, title: text });
    }

    this.showError(text);
  };

  onChangeInputValue = (text) => {
    this.showError(text);

    this.setState({
      inputValue: text,
    });
  };

  showError = (text) => {
    const { inputError } = this.state;
    const noValue = text === "";

    if (noValue) {
      inputError !== true && this.setState({ inputError: true });
    } else {
      inputError === true && this.setState({ inputError: false });
    }
  };

  render() {
    const { inputError, inputValue } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Card
          style={{
            flex: 1,
          }}
        >
          <Card.Content style={styles.content}>
            <Headline style={{ fontSize: 30, marginBottom: 14 }}>
              What is the title of your new deck?
            </Headline>

            <TextInput
              style={styles.input}
              onChangeText={(text) => this.onChangeInputValue(text)}
              value={inputValue}
              onSubmitEditing={({ nativeEvent: { text } }) => {
                this.handleSubmit(text);
              }}
            />
            {inputError && (
              <Text style={styles.error}>
                Ooops, please add a title for the new deck.
              </Text>
            )}
          </Card.Content>
        </Card>
        <View style={styles.actions}>
          <Button
            onPress={() => this.handleSubmit(inputValue)}
            disabled={!inputValue && true}
          >
            Add new Deck
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  error: {
    color: "crimson",
  },
  actions: {
    flex: 0,
    padding: 40,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    marginBottom: 4,
    textAlign: "center",
    marginBottom: 12,
  },
});

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    addDeck: (deck) => dispatch(addNewDeck(deck)),
    goBack: () => navigation.goBack(),
  };
};

export default connect(null, mapDispatchToProps)(NewDeckScreen);
