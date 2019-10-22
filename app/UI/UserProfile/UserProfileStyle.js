import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const ProfileStyles = StyleSheet.create({
    Background: {
        flex: 1,
        backgroundColor: "#CD0B25"
    },
    ProfileImage: {
        width: 150,
        height: 150,
        borderRadius: 150/ 2
    },
    Body: {
        minHeight: height * 0.7,
        // backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    Titles: {
        fontSize: width * 0.1,
        color: '#fff',
    },
    Text: {
        textAlign: 'left',
        fontSize: 15,
        fontFamily: 'Aller',
    },
    TextBold: {
        fontWeight: 'bold'
    }
});