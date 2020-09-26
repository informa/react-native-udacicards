import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import CardFlip from "react-native-card-flip";
import Button from "../components/Button";
import { Entypo } from "@expo/vector-icons";
import colors from "../util/colors";
import Result from "../components/Result";
import ResultList from "../components/ResultList";
import TouchableCard from "../components/TouchableCard";

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
    const color = isCorrect ? colors.green : colors.error;
    const icon = isCorrect ? (
      <Entypo name="check" size={24} color="white" />
    ) : (
      <Entypo name="cross" size={28} color="white" />
    );
    return (
      <Result icon={icon} answer={answer} question={question} color={color} />
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
                <TouchableCard
                  onPress={() => this.card.flip()}
                  front
                  label={question}
                  buttonText="See possible Answer"
                />
                <TouchableCard
                  onPress={() => this.card.flip()}
                  back
                  label={answer}
                  buttonText="See question"
                />
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
                  backgroundColor: colors.green,
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
                style={{ backgroundColor: colors.red }}
              >
                Incorrect
              </Button>
            </View>
          </View>
        </Animated.View>
      </View>
    ) : (
      <ResultList
        data={questions}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${index}_${item.question}`}
        header={`Results: ${this.getResults()} of ${total} correct.`}
        onPress={this.resetQuiz}
      />
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
  },
  cardContainer: {
    width: "100%",
    flex: 1,
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
