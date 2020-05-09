import {StyleSheet} from 'react-native';
import {colorPrimary, colorWhite, colorBlackish} from '../../theme/Colors';

export const MOBILE_INPUT_HEIGHT = 170;

export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPrimary,
    },
    outerInputContainer: {
        backgroundColor: colorPrimary,
        ...StyleSheet.absoluteFill,
    },
    innerInputContainer: {
        backgroundColor: colorWhite,
        ...StyleSheet.absoluteFill,
    },
    introText: {
        marginHorizontal: 20,
        marginTop: 20,
        fontSize: 18,
        color: colorBlackish,
    },
    mobileInputContainer: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        fontSize: 18,
        marginRight: 15,
        color: colorBlackish,
    },
    numberInput: {
        flex: 1,
        height: 40,
        borderWidth: 0.5,
        paddingHorizontal: 5,
        fontSize: 18,
    },
    overLay: {
        height: MOBILE_INPUT_HEIGHT,
    },
});
