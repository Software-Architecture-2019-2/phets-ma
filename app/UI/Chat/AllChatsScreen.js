import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";

import ChatsTabsComponent from "./ChatsTabsComponent";

const { height, width } = Dimensions.get('window');

class AllChatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.Background}>
        <View style={styles.head}>
          <View styles={styles.Container}>
            <View>
              <Text style={styles.Titles}>Phets</Text>
            </View>
          </View>
        </View>
        <ChatsTabsComponent
          phetsList={this.props.phetsChats}
          adoptionList={this.props.adoptionChats}
          navigateToChatView={(params) => this.props.navigateToChatView(params)}
          currentPhet={this.props.currentPhet}
          username={this.props.username}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#FFCCBC",
  },
  Container: {
    padding: 15,
    paddingBottom: 0,
    flexDirection: "row",
  },
  Superior: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: "center",
  },
  head: {
    paddingTop: 10,
    paddingRight: 10,
    height: height * 0.15
  },
  Body: {
    height: height * 0.85,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60
  },
  Titles: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: width * 0.1,
    color: '#fff',
  },
  TextCenter: {
    alignItems: 'center',
  },
  MarginRight: {
    marginRight: 20
  },
  scrollH: {
    paddingLeft: 20,
    paddingTop: width * 0.16 / 2
  },
  Chat: {
    flexDirection: "row",
    marginTop: 15
  },
  Data: {
    paddingLeft: 25,
  },
  NameChat: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginTop: 5
  },
  TextChat: {
    color: "gray",
    marginTop: 10,
  },
  BorderBottom: {
    paddingBottom: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: width * 0.6
  }

})

export default AllChatsScreen;