import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import LogInComponent from "../UI/LogIn/LogInComponent";
import SignUpComponent from "../UI/SignUp/SignUpComponent";

//Stacks
import MainStack from "./MainStack"

const InitStack = createStackNavigator(
  {
    LogInView: {
      screen: LogInComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
    SignUpView: {
      screen: SignUpComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
    MainStack: {
      screen: MainStack,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    }
  },
  {
    initialRouteName: "MainStack"
  }
);

export default createAppContainer(InitStack)