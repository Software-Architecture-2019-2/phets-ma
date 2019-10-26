import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const UserEditionStyles = StyleSheet.create({
    ProfileImage: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    }
});