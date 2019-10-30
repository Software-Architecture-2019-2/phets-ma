import React, { Component } from "react";

import firestore from '@react-native-firebase/firestore';


import ChatScreen from "./ChatInitialScreen"

class ChatInitialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  async getChannels() {
    const sent = 'brandonavilan@gmail.com'
    const received = 'andreavilan@gmail.com'
    const documentSnapshot = await firestore()
      .collection('channels')
      .doc(sent)
      .collection(received)
      .get();
    console.log(documentSnapshot.docs.forEach((doc, _) => {
      console.log(doc.data())
    }))
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <ChatScreen
        changeToBack={() => this.changeToBack()}
      />
    )
  }
}

export default ChatInitialComponent;