import { StyleSheet, Dimensions } from "react-native";

const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const BLACK = "#000000";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
	// COMPONENT - CARD ITEM
	containerCardItem: {
		backgroundColor: WHITE,
		borderRadius: 10,
		alignItems: "center",
		margin: 20,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	descriptionCardItem: {
		color: GRAY,
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 20
	},

	// CONTAINER - GENERAL
	phetsbg: {
    flex: 1,
    backgroundColor: "#FFCCBC",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
  },
  
  imageStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
		width: DIMENSION_WIDTH - 40,
		height: DIMENSION_HEIGHT*0.75,
  },
  nameStyle: {
    marginTop: 35,
		paddingBottom: 5,
		color: "#363636",
    fontSize: 30,
  },
  button: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#FFF', 
    padding: 10, 
    zIndex: 100,
    shadowColor: "#000", 
    shadowOpacity: 0.23, 
    shadowRadius: 2.62, 
    elevation: 5,
  },
});