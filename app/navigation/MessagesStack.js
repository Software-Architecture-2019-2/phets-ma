import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import AllChatsComponent from "../UI/Chat/AllChatsComponent";
import ChatComponent from "../UI/Chat/ChatComponent"

const MessagesStack = createStackNavigator(
  {
    AllChats: {
      screen: AllChatsComponent,
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
    initialRouteName: "AllChats"
  }
);

export default createAppContainer(MessagesStack)