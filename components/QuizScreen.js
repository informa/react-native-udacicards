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
  Easing,
} from "react-native";
import CardFlip from "react-native-card-flip";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Card, Avatar, Paragraph } from "react-native-paper";

class QuizScreen extends React.Component {
  constructor(props) {
    super(props);

    // Get the screen width
    this.screenWidth = Dimensions.get("window").width;
    // Quiz position
    this.quizPosition = 0;
    // Set initial animation value to right offscreen
    this.transformX = new Animated.Value(this.screenWidth);

    this.state = {
      quizPosition: this.quizPosition,
      answers: {},
    };
  }

  componentDidMount() {
    //Animate: question comes from offscreen right to center
    Animated.spring(this.transformX, {
      toValue: 0,
      speed: 5,
      useNativeDriver: true,
    }).start();

    // Reset Quiz on mount
    this.resetQuiz();
  }

  handleAnswer = ({ answer, questionNumber }) => {
    //Animate: move from center of screen to left offscreen
    Animated.timing(this.transformX, {
      toValue: -this.screenWidth,
      easing: Easing.in(),
      duration: 170,
      useNativeDriver: true,
    }).start(() => {
      //Animate: After animation is finished:
      // - update the question and quiz position
      // - set the position of the question the right off screen
      this.transformX.setValue(this.screenWidth);

      this.setState(
        (previousState) => ({
          quizPosition: previousState.quizPosition + 1,
          answers: {
            ...previousState.answers,
            [questionNumber]: answer,
          },
        }),
        () => {
          //Animate: question move from offscreen right to center
          Animated.spring(this.transformX, {
            toValue: 0,
            speed: 5,
            useNativeDriver: true,
          }).start(() => {
            this.transformX.setValue(0);
          });
        }
      );
    });
  };

  renderItem = ({ item, index }) => {
    const { answers } = this.state;
    const { question, answer, result } = item;
    const isCorrect = result === answers[index];
    const color = isCorrect ? "mediumseagreen" : "crimson";
    const icon = isCorrect ? (
      <Entypo name="check" size={24} color="white" />
    ) : (
      <Entypo name="cross" size={28} color="white" />
    );
    return (
      <Card style={{ marginTop: 8 }}>
        <Card.Title
          style={{ marginBottom: -15 }}
          title={question}
          left={() => (
            <Avatar.Icon
              size={36}
              icon={() => icon}
              style={{
                backgroundColor: color,
              }}
            />
          )}
        />
        <Card.Content style={{ marginLeft: 55 }}>
          <Paragraph>{answer}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  getResults = () => {
    const { answers } = this.state;
    const { questions } = this.props;

    let results = 0;

    questions.map((question, index) => {
      return question.result === answers[index] ? results++ : results;
    });

    return results;
  };

  resetQuiz = () => {
    this.setState(() => ({
      quizPosition: this.quizPosition,
      answers: {},
    }));
  };

  render() {
    const { quizPosition } = this.state;
    const { total, questions } = this.props;
    const quizEnd = quizPosition !== total;
    const { question, answer } = quizEnd && questions[quizPosition];

    return quizEnd ? (
      <View style={styles.container}>
        <Text style={styles.title}>
          Questions {quizPosition}/{total}
        </Text>
        <Animated.View
          style={[
            {
              transform: [{ translateX: this.transformX }],
              ...styles.animationWrapper,
            },
          ]}
        >
          <View style={styles.slide} key={question}>
            <View style={styles.content}>
              <CardFlip
                style={styles.cardContainer}
                ref={(card) => (this.card = card)}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.card.flip()}
                  style={{ flex: 1 }}
                >
                  <Card style={[styles.card, styles.card1]}>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardLabel}>{question}</Text>
                      <Text style={[styles.cardButton, styles.cardButton1]}>
                        See possible Answer
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ flex: 1 }}
                  onPress={() => this.card.flip()}
                >
                  <Card style={[styles.card, styles.card2]}>
                    <View style={styles.cardContent}>
                      <Text style={[styles.cardLabel, styles.cardLabel2]}>
                        {answer}
                      </Text>
                      <Text style={styles.cardButton}>See question</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              </CardFlip>
            </View>
            <View style={styles.actions}>
              <Button
                onPress={() =>
                  this.handleAnswer({
                    questionNumber: quizPosition,
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
                    questionNumber: quizPosition,
                    answer: "incorrect",
                  })
                }
                style={{ backgroundColor: "tomato" }}
              >
                Incorrect
              </Button>
            </View>
          </View>
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
              <Text style={styles.title}>
                Results: {this.getResults()} of {total} correct.
              </Text>
            }
          />
        </View>
        <View style={styles.actions}>
          <Button
            onPress={this.resetQuiz}
            style={{ backgroundColor: "mediumseagreen" }}
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
    marginLeft: 30,
    marginRight: 30,
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
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  resultsContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
    paddingTop: 14,
    marginBottom: 8,
  },
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
