import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import AnimalViewComponent from "../UI/AnimalView/AnimalViewComponent";
import AnimalFormComponent from "../UI/AnimalForm/AnimalFormComponent";

const AnimalStack = createStackNavigator(
  {
    Animal: {
      screen: AnimalViewComponent,
      navigationOptions: {
        header: null,
      }
    },
    EditAnimal: AnimalFormComponent,
  },
  {
    initialRouteName: "Animal"
  }
);

export default createAppContainer(AnimalStack)