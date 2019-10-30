import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import AnimalViewComponent from "../UI/AnimalView/AnimalViewComponent";
import AnimalFormComponent from "../UI/AnimalForm/AnimalFormComponent";
import ListEventComponent from "../UI/Event/ListEventComponent";
import ShowEventComponent from "../UI/Event/ShowEventComponent";
import CreateEventComponent from "../UI/Event/CreateEventComponent";

const AnimalStack = createStackNavigator(
  {
    Animal: {
      screen: AnimalViewComponent,
      navigationOptions: {
        header: null,
      }
    },
    EditAnimal: AnimalFormComponent,

    ListEvent: {
      screen: ListEventComponent,
      navigationOptions: {
        header: null,
      }
    },
    ShowEvent: {
      screen: ShowEventComponent,
      navigationOptions: {
        header: null,
      }
    },
    CreateEvent: {
      screen: CreateEventComponent,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: "Animal"
  }
);

export default createAppContainer(AnimalStack)