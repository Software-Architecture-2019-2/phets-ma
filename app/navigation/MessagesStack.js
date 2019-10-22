import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import LogInComponent from "../UI/SignUp/SignUpComponent";

const MessagesStack = createStackNavigator(
  {
    AdoptionView: {
      screen: LogInComponent,
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