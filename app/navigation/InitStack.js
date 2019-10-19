import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

//Componentes
import LogInComponent from "../UI/LogIn/LogInComponent";
import SignInComponent from "../UI/SignIn/SignInComponent";

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
    SignInView: {
      screen: SignInComponent,
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
    initialRouteName: "LogInView"
  }
);

export default createAppContainer(InitStack)