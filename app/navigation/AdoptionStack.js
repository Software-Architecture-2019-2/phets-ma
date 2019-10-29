import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import AdoptionALlComponent from "../UI/Adoption/AdoptionAllComponent";
import AnimalViewComponent from "../UI/AnimalView/AnimalViewComponent";

const AdoptionStack = createStackNavigator(
  {
    AdoptionAllView: {
      screen: AdoptionALlComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
    AdoptionView: {
      screen: AnimalViewComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
  },
  {
    initialRouteName: "AdoptionAllView"
  }
);

export default createAppContainer(AdoptionStack)