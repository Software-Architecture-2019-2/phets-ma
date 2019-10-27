import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import PhetsInitialComponent from "../UI/Phets/PhetsInitialComponent";

const TinderStack = createStackNavigator(
  {
    AdoptionView: {
      screen: PhetsInitialComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
  },
  {
    initialRouteName: "AdoptionView"
  }
);

export default createAppContainer(TinderStack)