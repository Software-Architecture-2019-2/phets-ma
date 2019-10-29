import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import PhetsInitialComponent from "../UI/Phets/PhetsInitialComponent";

const PhetsStack = createStackNavigator(
  {
    PhetsView: {
      screen: PhetsInitialComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
  },
  {
    initialRouteName: "PhetsView"
  }
);

export default createAppContainer(PhetsStack)