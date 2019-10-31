import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";

import { GiftedChat } from 'react-native-gifted-chat'
import { Avatar } from 'react-native-elements';

const { height, width } = Dimensions.get('window');

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    }
  }

  onSend(messages = []) {
    this.props.createMessage({
      sent: this.props.from.id,
      received: this.props.to,
      messages: messages[0].text,
      adopt: false,
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {

    return (
      <View style={styles.Background}>
        <View style={styles.head}>
          <View style={styles.Chat}>
            <View style={styles.DirectionRow}>
              <Avatar
                rounded
                size={height * 0.06}
                source={{
                  uri: this.props.image
                }}
              />
              <View style={styles.Data}>
                <Text style={styles.NameChat}>{this.props.name}</Text>
              </View>
            </View>

          </View>
        </View>
        {/* <ScrollView> */}
        <View style={[styles.Body, { paddingBottom: 100 }]}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.props.from.id.toString(10)
            }}
            inverted={false}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#FFCCBC",
  },

  head: {
    paddingTop: height * 0.02,
    paddingRight: 10,
    height: height * 0.1
  },
  Body: {
    height: height * 0.9,
    backgroundColor: '#fff',
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
    marginTop: 5,
    marginLeft: 15,
  },
  Data: {
    paddingLeft: 20,
  },
  NameChat: {
    fontSize: width * 0.06,
    marginTop: height * 0.01,
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
  },
  DirectionRow: {
    flexDirection: "row",
  }

})

export default ChatScreen;