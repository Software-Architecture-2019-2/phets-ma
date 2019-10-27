import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import AdoptionALlComponent from "../UI/Adoption/AdoptionAllComponent";
import AdoptionViewComponent from "../UI/Adoption/AdoptionViewComponent";

const AdoptionStack = createStackNavigator(
  {
    AdoptionAllView: {
      screen: AdoptionALlComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
    AdoptionView: {
      screen: AdoptionViewComponent,
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