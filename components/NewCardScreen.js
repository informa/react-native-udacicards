import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { RadioButton } from "react-native-paper";
import { addNewCard } from "../actions";
import { addCardToDeck } from "../util/api";
import Button from "./Button";
import { Card, Headline } from "react-native-paper";

class NewCardScreen extends React.Component {
  state = {
    inputQuestion: "",
    inputAnswer: "",
    checked: "correct",
  };

  handleSubmit = () => {
    const { inputAnswer, inputQuestion, checked } = this.state;
    const { goBack, addCard, route } = this.props;
    const { deckId } = route.params;

    const card = {
      question: inputQuestion,
      answer: inputAnswer,
      result: checked,
    };

    // dispatch
    addCard(card);

    // reset state
    this.setState({
      inputQuestion: "",
      inputAnswer: "",
      checked: "correct",
    });

    // go back
    goBack();

    // add to local storage
    addCardToDeck({ deckId, card });
  };

  onChangeInputValue = ({ value, name }) => {
    this.setState({
      [`input${name}`]: value,
    });
  };

  render() {
    const { inputAnswer, inputQuestion, checked } = this.state;

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
              Add a new card?
            </Headline>
            <View style={styles.labelContainer}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.label}>Question</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                this.onChangeInputValue({ value, name: "Question" })
              }
              value={inputQuestion}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.label}>Answer</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                this.onChangeInputValue({ value, name: "Answer" })
              }
              value={inputAnswer}
            />

            <View style={styles.labelContainer}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.label}>Is this answer correct?</Text>
            </View>

            <View style={styles.labelContainer}>
              <Text style={{ flexBasis: 30, ...styles.label }}>Yes</Text>
              <View style={styles.radioButton}>
                <RadioButton
                  color="mediumseagreen"
                  value="correct"
                  status={checked === "correct" ? "checked" : "unchecked"}
                  onPress={() => this.setState({ checked: "correct" })}
                />
              </View>
            </View>

            <View style={styles.labelContainer}>
              <Text style={{ flexBasis: 30, ...styles.label }}>No</Text>
              <View style={styles.radioButton}>
                <RadioButton
                  color="mediumseagreen"
                  value="incorrect"
                  status={checked === "incorrect" ? "checked" : "unchecked"}
                  onPress={() => this.setState({ checked: "incorrect" })}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
        <View style={styles.actions}>
          <Button
            onPress={() => this.handleSubmit()}
            disabled={(!inputQuestion || !inputAnswer) && true}
          >
            Add new Card
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const radioButtonIOS = Platform.OS === "ios" && {
  backgroundColor: "lightgray",
  marginBottom: 4,
};

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
  labelContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  label: {
    color: "gray",
    fontSize: 18,
    marginBottom: 4,
    marginTop: 8,
  },
  required: {
    color: "crimson",
    marginRight: 8,
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
  radioButton: {
    ...radioButtonIOS,
    borderRadius: 100,
    marginLeft: 8,
  },
});

const mapDispatchToProps = (dispatch, { route, navigation }) => {
  const { deckId } = route.params;
  return {
    addCard: (card) => dispatch(addNewCard({ deckId, card })),
    goBack: () => navigation.goBack(),
  };
};

export default connect(null, mapDispatchToProps)(NewCardScreen);
