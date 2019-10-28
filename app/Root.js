import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import store from "./redux/store/index.js";
import { clearLocalStorage } from "./redux/store/LocalStorage";
import { View } from "react-native";

import InitStack from "./navigation/InitStack";
import MainStack from "./navigation/MainStack";

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <View style={{ flex:1 }}>
          <InitStack />
        </View>
      </Provider>
    );
  }
}

export default App;