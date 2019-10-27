import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import ChatInitialComponent from "../UI/Chat/ChatInitialComponent";
import ChatComponent from "../UI/Chat/ChatComponent"

const MessagesStack = createStackNavigator(
  {
    ChatInitialView: {
      screen: ChatInitialComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
    ChatView: {
      screen: ChatComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
  },
  {
    initialRouteName: "ChatView"
  }
);

export default createAppContainer(MessagesStack)