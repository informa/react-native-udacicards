import * as React from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import shortid from "shortid";
import { saveDeckTitle } from "../util/api";
import { addNewDeck } from "../actions";
import colors from "../util/colors";
import { Card, Button, TextInput, Title } from "react-native-paper";

class NewDeckScreen extends React.Component {
  state = {
    inputValue: "",
    inputError: false,
  };

  handleSubmit = (text) => {
    const { addDeck } = this.props;
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

      // add to local storage
      saveDeckTitle({ id, title: text });

      // Reset state, goBack, hide keyboard
      this.reset();
    }

    this.showError(text);
  };

  reset = () => {
    const { goBack } = this.props;

    // reset state
    this.setState({ inputValue: "", inputError: false });

    // go to home
    goBack();

    Keyboard.dismiss();
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
        <Card.Content>
          <Title>What is the title of your new deck?</Title>
          <TextInput
            onChangeText={(text) => this.onChangeInputValue(text)}
            value={inputValue}
            label="New Deck"
            mode="outlined"
            multiline
            error={inputError}
            style={{ marginBottom: 8 }}
          />
          {inputError && (
            <Text style={styles.error}>
              Ooops, please add a title for the new deck.
            </Text>
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => this.handleSubmit(inputValue)}
            disabled={!inputValue && true}
          >
            Add new Deck
          </Button>
          <Button onPress={() => this.reset()} color="#666666">
            Cancel
          </Button>
        </Card.Actions>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
  error: {
    color: colors.error,
  },
});

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    addDeck: (deck) => dispatch(addNewDeck(deck)),
    goBack: () => navigation.goBack(),
  };
};

export default connect(null, mapDispatchToProps)(NewDeckScreen);
