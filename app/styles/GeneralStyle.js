import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export const GeneralStyles = StyleSheet.create({
    Background: {
        flex: 1,
        backgroundColor: "#66B266"
    },
    BlueColor: {
        backgroundColor: '#77A6F7'
    },
    Body: {
        minHeight: height * 0.7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    Bold: {
        fontWeight: 'bold'
    },
    Italic: {
        fontStyle: 'italic'
    },
    Text: {
        textAlign: 'left',
        fontSize: 15,
        fontFamily: 'Aller',
    },
})