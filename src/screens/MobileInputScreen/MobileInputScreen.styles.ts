import {Dimensions, StyleSheet} from 'react-native';
import {colorPrimary, colorWhite, colorBlackish} from '../../theme/Colors';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: colorWhite,
        ...StyleSheet.absoluteFill,
    },
    introText: {
        marginHorizontal: 20,
        marginTop: 20,
        fontSize: 16,
        color: colorBlackish,
    },
    languagePickerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});
