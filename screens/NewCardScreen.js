import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { RadioButton } from "react-native-paper";
import { addNewCard } from "../actions";
import { addCardToDeck } from "../util/api";
import { Card, Title, Button, TextInput, Subheading } from "react-native-paper";
import colors from "../util/colors";

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
        <Card.Content>
          <Title>Add a new card?</Title>

          <TextInput
            label="Question"
            mode="outlined"
            multiline
            onChangeText={(value) =>
              this.onChangeInputValue({ value, name: "Question" })
            }
            value={inputQuestion}
          />

          <TextInput
            label="Answer"
            mode="outlined"
            multiline
            onChangeText={(value) =>
              this.onChangeInputValue({ value, name: "Answer" })
            }
            value={inputAnswer}
          />

          <Subheading>Is this answer correct?</Subheading>

          <View style={styles.labelContainer}>
            <Subheading style={{ flexBasis: 30 }}>Yes</Subheading>
            <View style={styles.radioButton}>
              <RadioButton
                color={colors.blue}
                value="correct"
                status={checked === "correct" ? "checked" : "unchecked"}
                onPress={() => this.setState({ checked: "correct" })}
              />
            </View>
          </View>

          <View style={styles.labelContainer}>
            <Subheading style={{ flexBasis: 30 }}>No</Subheading>
            <View style={styles.radioButton}>
              <RadioButton
                color={colors.blue}
                value="incorrect"
                status={checked === "incorrect" ? "checked" : "unchecked"}
                onPress={() => this.setState({ checked: "incorrect" })}
              />
            </View>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button
            onPress={() => this.handleSubmit()}
            disabled={(!inputQuestion || !inputAnswer) && true}
          >
            Add new Card
          </Button>
        </Card.Actions>
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
    paddingTop: 20,
    backgroundColor: "white",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "baseline",
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
