import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// Components
import UserProfileComponent from "../UI/UserProfile/UserProfileComponent";

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: UserProfileComponent,
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