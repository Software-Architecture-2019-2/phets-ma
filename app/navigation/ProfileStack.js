import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import UserProfileComponent from "../UI/UserProfile/UserProfileComponent";
import UserEditionComponent from "../UI/UserEdition/UserEditionComponent";
import AnimalStack from "./AnimalStack";
import AnimalFormComponent from '../UI/AnimalForm/AnimalFormComponent'

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: UserProfileComponent,
      navigationOptions: {
        header: null,
      }
    },
    UserEdition: UserEditionComponent,
    AnimalStack: {
      screen: AnimalStack,
      navigationOptions: {
        header: null,
      }
    },
    CreateAnimal: AnimalFormComponent,
  },
  {
    initialRouteName: "Profile"
  }
);

export default createAppContainer(ProfileStack)