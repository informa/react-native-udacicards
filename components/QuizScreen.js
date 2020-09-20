import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CardFlip from "react-native-card-flip";
import Button from "./Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

class QuizScreen extends React.Component {
  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get("window").width;
    this.card = [];

    this.state = {
      screenWidth,
      transformX: new Animated.Value(0),
      quizPosition: 0,
      questions: this.props.questions,
    };
  }

  componentDidMount() {
    const { transformX, screenWidth } = this.state;

    // Animated.spring(transformX, {
    //   toValue: -screenWidth,
    //   speed: 5,
    //   useNativeDriver: true,
    // }).start();
  }

  handleAnswer = ({ answer, questionNumber }) => {
    const { questions, quizPosition } = this.state;

    // Handle state, add user answer and increase quiz position by 1
    this.setState((previousState) => ({
      questions: previousState.questions.map((question, index) =>
        index === questionNumber ? { ...question, user: answer } : question
      ),
      quizPosition: previousState.quizPosition + 1,
    }));

    // go to next question

    //
  };

  renderItem = ({ item }) => {
    const { question, answer, result, user } = item;
    const icon =
      result === user ? (
        <AntDesign name="checkcircleo" size={24} color="mediumseagreen" />
      ) : (
        <AntDesign name="closecircleo" size={24} color="crimson" />
      );
    return (
      <View style={styles.results}>
        <View style={styles.resultsContent}>
          <Text style={styles.resultsQuestion}>{question}</Text>
          <Text style={styles.resultsAnswer}>{answer}</Text>
        </View>
        {icon}
      </View>
    );
  };

  getResults = () => {
    const { questions } = this.state;

    let results = 0;

    questions.map((question) => {
      results = question.result === question.user ? results + 1 : results;
    });

    return results;
  };

  handleReset = () => {
    this.setState(() => ({
      questions: this.props.questions,
      quizPosition: 0,
    }));
  };

  render() {
    const { transformX, questions, quizPosition } = this.state;
    const { total } = this.props;

    console.log(this.state);

    return quizPosition !== total ? (
      <View style={styles.container}>
        <Text style={styles.position}>
          {quizPosition}/{total}
        </Text>
        <Animated.View
          style={[
            {
              transform: [{ translateX: transformX }],
              ...styles.animationWrapper,
            },
          ]}
        >
          {questions.map((item, index) => {
            const { question, answer } = item;
            return (
              <View style={styles.slide} key={question}>
                <View style={styles.content}>
                  <CardFlip
                    style={styles.cardContainer}
                    ref={(card) => (this.card[index] = card)}
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[styles.card, styles.card1]}
                      onPress={() => this.card[index].flip()}
                    >
                      <Text style={styles.cardLabel}>{question}</Text>
                      <Text style={[styles.cardButton, styles.cardButton1]}>
                        See possible Answer
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[styles.card, styles.card2]}
                      onPress={() => this.card[index].flip()}
                    >
                      <Text style={[styles.cardLabel, styles.cardLabel2]}>
                        {answer}
                      </Text>
                      <Text style={styles.cardButton}>See question</Text>
                    </TouchableOpacity>
                  </CardFlip>
                </View>
                <View style={styles.actions}>
                  <Button
                    onPress={() =>
                      this.handleAnswer({
                        questionNumber: index,
                        answer: "correct",
                      })
                    }
                    style={{
                      ...styles.newCard,
                      backgroundColor: "mediumseagreen",
                    }}
                  >
                    Correct
                  </Button>
                  <Button
                    onPress={() =>
                      this.handleAnswer({
                        questionNumber: index,
                        answer: "incorrect",
                      })
                    }
                    style={{ backgroundColor: "tomato" }}
                  >
                    Incorrect
                  </Button>
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.resultsContainer}>
          <FlatList
            data={questions}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.question}
            ListHeaderComponent={
              <Text>
                Results: {this.getResults()} of {total} correct.
              </Text>
            }
          />
        </View>
        <View style={styles.actions}>
          <Button
            onPress={this.handleReset}
            style={{ backgroundColor: "tomato" }}
          >
            Start again
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
  animationWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  slide: {
    flexBasis: "100%",
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flex: 0,
    padding: 40,
  },
  newCard: {
    marginBottom: 10,
    backgroundColor: "tomato",
  },
  question: {
    fontSize: 30,
    marginBottom: 4,
    textAlign: "center",
  },
  answer: {
    fontSize: 18,
    color: "crimson",
  },
  cardContainer: {
    width: "100%",
    flex: 1,
  },
  card: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    padding: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "white",
  },
  card2: {
    backgroundColor: "deepskyblue",
    color: "#ffffff",
  },
  cardLabel2: {
    color: "#ffffff",
  },
  cardButton: {
    fontSize: 16,
  },
  cardButton1: {
    color: "dodgerblue",
  },
  cardLabel: {
    marginBottom: 12,
    textAlign: "center",
    fontSize: 24,
  },
  position: {
    textAlign: "center",
    paddingTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: { flex: 1 },
  results: { flexDirection: "row", margin: 10 },
  resultsContent: { flex: 1 },
  resultsQuestion: { fontSize: 18 },
  resultsAnswer: { fontSize: 16 },
});

const mapStateToProps = (state, { route }) => {
  const { deckId } = route.params;
  const deckQuestions = state[deckId].questions;
  return {
    questions: deckQuestions,
    total: deckQuestions.length,
  };
};

export default connect(mapStateToProps)(QuizScreen);
