import {StyleSheet} from 'react-native';

const BUTTON_SIZE = 24;
const BUTTON_CONTAINER_SIZE = 40;

export const styles = StyleSheet.create({
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
    },
    buttonContainer: {
        position: 'absolute',
        height: BUTTON_CONTAINER_SIZE,
        width: BUTTON_CONTAINER_SIZE,
        top: 60,
        left: 25,
        zIndex: 100,
    },
});
