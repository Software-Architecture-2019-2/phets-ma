import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

//Componentes
import LobbyComponent from "../UI/Lobby/LobbyComponent";

const MainStack = createStackNavigator(
  {
    LobbyView: {
      screen: LobbyComponent,
      navigationOptions: {
        header: null, //Para no poner la barra superior
      }
    },
  
  },
  {
    initialRouteName: "LobbyView"
  }
);

export default createAppContainer(MainStack)