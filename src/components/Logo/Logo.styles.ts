import {StyleSheet} from 'react-native';
import {colorWhite, colorBlackish} from '../../theme/Colors';
import {logoBorderRadius} from '../../util/Constance';

const LOGO_SIZE = 120;
const LOGO_TEXT_SIZE = 45;

export const styles = StyleSheet.create({
    logoContainer: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        backgroundColor: colorWhite,
        borderRadius: logoBorderRadius,
        borderTopRightRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: LOGO_TEXT_SIZE,
        fontWeight: 'bold',
        color: colorBlackish,
    },
});
