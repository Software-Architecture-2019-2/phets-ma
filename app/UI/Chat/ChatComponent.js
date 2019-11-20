import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from "react-redux";
import ChatScreen from "./ChatScreen"
import { getMessagesService, createMessageService } from "../../services/ChatServices";
import { ChatStrings } from "./ChatStrings";

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null
    }
    this.chatData = this.props.navigation.state.params;
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages() {
    getMessagesService(
      this.chatData.from.id, 
      this.chatData.to,
      this.props.user.token,
       (messages) => {
        this.setState({ messages: this.parseMessages(messages) })
    });
  }

  parseMessages(messages) {
    return messages.map((message, index) => {
      return {
        _id: index.toString(10),
        createdAt: new Date(message.time),
        text: message.message,
        user: { _id: message.sent }
      }
    })
  }

  createMessage = (data) => {
    const {token} = this.props.username;
    createMessageService(data, token, (res) => {
      console.log(res)
    })
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
    if (this.state.messages) {
      return (
        <ChatScreen
          changeToBack={() => this.changeToBack()}
          messages={this.state.messages}
          from={this.chatData.from}
          to={this.chatData.to}
          name={this.chatData.name}
          image={this.chatData.image}
          createMessage={this.createMessage}
          
        />
      )
    } else {
      return <Spinner
        visible={true}
        textContent={ChatStrings.loadingLabel}
      />
    }
  }
}

function mapStateToProps(state) {
  const user = state.login.user;
  const phets = state.setPhetsList.phets;
  const defaultPhet = state;
  return {
    user,
    phets,
    defaultPhet
  };
}
const connectedChatComponent = connect(mapStateToProps)(ChatComponent);
export default connectedChatComponent;