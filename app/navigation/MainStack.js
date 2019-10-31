import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Importacion de Iconos
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClone, faUser, faComments, faHome } from '@fortawesome/free-solid-svg-icons';

//Componentes
import PhetsTab from "./PhetsStack";
import ProfileTab from "./ProfileStack";
import MessagesTab from "./MessagesStack";
import AdoptionTab from "./AdoptionStack";

PhetsTab.navigationOptions = {
  tabBarLabel: 'Phets',
};

ProfileTab.navigationOptions = {
  tabBarLabel: 'Profile',
};

MessagesTab.navigationOptions = {
  tabBarLabel: 'Messages',
};

AdoptionTab.navigationOptions = {
  tabBarLabel: 'Adoption',
};


const MainStack = createBottomTabNavigator(
  {//RouteConfigs
    Phets: PhetsTab,
    Adoption: AdoptionTab,
    Profile: ProfileTab,
    Messages: MessagesTab,
  },
  {
    initialRouteName: "Phets",
    //BottomTabNavigatorConfig
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Phets') {
          return (
            <FontAwesomeIcon icon={faClone} size={20} color={"black"} />
          );
        } else if (routeName === 'Profile') {
          return (
            <FontAwesomeIcon icon={faUser} size={20} color={"black"} />
          );
        } else if (routeName === 'Messages') {
          return (
            <FontAwesomeIcon icon={faComments} size={20} color={"black"} />
          );
        } else {
          return (
            <FontAwesomeIcon icon={faHome} size={20} color={"black"} />
          );
        }
      },
    }),
    tabBarOptions: {
      //color de activo e inactivo las pestañas
      activeTintColor: '#77A6F7',
      inactiveTintColor: '#263238',
    },
  }
);

export default createAppContainer(MainStack)