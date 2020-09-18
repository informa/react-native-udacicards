import * as React from "react";
import { connect } from "react-redux";
import { Text, View, FlatList } from "react-native";
import { AppLoading } from "expo";
import { getDecks } from "../util/api";
import { receiveDecks } from "../actions";
import Button from "./Button";
import DeckList from "./DeckList";

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
    return <DeckList {...item} />;
  };

  render() {
    const { navigation, decks } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        {/* <Text style={{ fontSize: 40 }}>Deck List!</Text> */}
        {/* <Button
          onPress={() => {
            navigation.navigate("DeckScreen");
          }}
        >
          Go to deck
        </Button> */}
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    );
  }
}
function mapStateToProps(decks) {
  const deckList = Object.keys(decks).map((deck) => {
    return {
      title: decks[deck].title,
      count: decks[deck].questions.length,
    };
  });

  return {
    decks: deckList,
  };
}

export default connect(mapStateToProps)(DeckListScreen);
