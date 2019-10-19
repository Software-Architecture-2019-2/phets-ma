import React, { Component } from "react";
import { View } from "react-native";

import InitStack from "./navigation/InitStack";

class App extends Component{
  render(){
    return(
      <View style={{ flex:1 }}>
        <InitStack />
      </View>
    );
  }
}

export default App;