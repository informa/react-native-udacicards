import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import { addNewCard } from "../actions";
import Button from "./Button";

class NewCardScreen extends React.Component {
  state = {
    inputQuestion: "",
    inputAnswer: "",
  };

  handleSubmit = () => {
    const { inputAnswer, inputQuestion } = this.state;
    const { goBack, addCard } = this.props;

    // dispatch
    addCard({
      question: inputQuestion,
      answer: inputAnswer,
    });

    // reset state
    this.setState({
      inputQuestion: "",
      inputAnswer: "",
    });

    // go back
    goBack();

    // add to local storage
  };

  onChangeInputValue = ({ value, name }) => {
    this.setState({
      [`input${name}`]: value,
    });
  };

  render() {
    const { inputAnswer, inputQuestion } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Add a new card?</Text>
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
        </View>
        <View style={styles.actions}>
          <Button
            onPress={() => this.handleSubmit()}
            disabled={(!inputQuestion || !inputAnswer) && true}
          >
            Add new Card
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 40,
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
  title: {
    fontSize: 30,
    marginBottom: 4,
    textAlign: "center",
    marginBottom: 12,
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
