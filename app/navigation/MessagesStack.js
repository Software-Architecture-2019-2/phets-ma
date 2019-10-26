import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import ChatInitialComponent from "../UI/Chat/ChatInitialComponent";

const MessagesStack = createStackNavigator(
  {
    AdoptionView: {
      screen: ChatInitialComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
  },
  {
    initialRouteName: "AdoptionView"
  }
);

export default createAppContainer(MessagesStack)