import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')
export const AnimalFormStyles = StyleSheet.create({
    AnimalImage: {
        height: height - 200,
        width: width - 40,
    },
    UploadImageView: {
        height: 80,
        width: width - 40,
    },
});