import * as React from "react";
import { connect } from "react-redux";
import { Text, View, FlatList } from "react-native";
import { AppLoading } from "expo";
import { getDecks } from "../util/api";
import { setDummyData } from "../util/helpers";
import { receiveDecks } from "../actions";
import DeckList from "./DeckList";
import Button from "./Button";

class DeckListScreen extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ isReady: true })));
  }

  renderItem = ({ item }) => {
    return <DeckList navigation={this.props.navigation} {...item} />;
  };

  // Sets the local storage and the state back to the initial data
  reset = () => {
    setDummyData().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };

  render() {
    const { navigation, decks } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
        <Button onPress={() => this.reset()}>RESET DATA</Button>
      </View>
    );
  }
}
function mapStateToProps(decks) {
  const deckList = Object.keys(decks).map((deck) => {
    return {
      title: decks[deck].title,
      count: decks[deck].questions.length,
      id: deck,
    };
  });

  return {
    decks: deckList,
  };
}

export default connect(mapStateToProps)(DeckListScreen);
