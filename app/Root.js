import React, { Component } from "react";
import { View } from "react-native";

import InitStack from "./navigation/InitStack";
import MainStack from "./navigation/MainStack";

class App extends Component{
  render(){
    return(
      <View style={{ flex:1 }}>
        <MainStack />
      </View>
    );
  }
}

export default App;