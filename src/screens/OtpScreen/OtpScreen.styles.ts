import {StyleSheet, Dimensions} from 'react-native';
import {colorAccent} from '../../theme/Colors';

export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const VIEW_WIDTH = Dimensions.get('window').width - 80;
export const otpStyles = StyleSheet.create({
    rootView: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        fontSize: 34,
        width: VIEW_WIDTH,
        borderColor: colorAccent,
        borderWidth: 1,
    },
});
