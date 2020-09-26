import * as React from "react";
import { connect } from "react-redux";
import { View, FlatList, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { getDecks } from "../util/api";
import { receiveDecks } from "../actions";
import DeckList from "../components/DeckList";

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
    return (
      <DeckList
        navigation={this.props.navigation}
        screen="DeckScreen"
        {...item}
      />
    );
  };

  render() {
    const { decks } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
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
      id: decks[deck].id,
    };
  });

  return {
    decks: deckList,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default connect(mapStateToProps)(DeckListScreen);
