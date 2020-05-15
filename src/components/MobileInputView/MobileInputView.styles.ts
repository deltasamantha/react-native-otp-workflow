import {StyleSheet} from 'react-native';
import {colorBlackish} from '../../theme/Colors';

export const INPUT_FONT_SIZE = 18;
export const styles = StyleSheet.create({
    mobileInputContainer: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        fontSize: INPUT_FONT_SIZE,
        marginRight: 15,
        color: colorBlackish,
    },
    numberInput: {
        flex: 1,
        height: 40,
        borderWidth: 0.5,
        paddingHorizontal: 5,
        fontSize: INPUT_FONT_SIZE,
    },
    activeInput: {
        backgroundColor: '#dee3de',
    },
    label: {
        fontSize: INPUT_FONT_SIZE,
        marginTop: 50,
        marginHorizontal: 20,
    },
});
