import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import UserProfileComponent from "../UI/UserProfile/UserProfileComponent";
import UserEditionComponent from "../UI/UserEdition/UserEditionComponent";

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: UserProfileComponent,
      navigationOptions: {
        header: null,
      }
    },
    UserEdition: {
      screen: UserEditionComponent,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    initialRouteName: "Profile"
  }
);

export default createAppContainer(ProfileStack)