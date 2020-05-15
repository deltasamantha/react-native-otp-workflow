import React, {useRef, useEffect} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {styles, otpStyles} from './OtpScreen.styles';
import Animated, {
    Value,
    Easing,
    interpolate,
    useCode,
    cond,
    eq,
    set,
} from 'react-native-reanimated';
import {withTimingTransition} from 'react-native-redash';
import {TextInput} from 'react-native-gesture-handler';
import {colorAccent} from '../../theme/Colors';

export default function OtpScreen() {
    return (
        <View style={styles.rootContainer}>
            <OTPInput />
        </View>
    );
}

function OTPInput() {
    const ANIMATION_DURATION = 500;
    const slideIn = useRef(new Value(0));
    const slideInAnimation = withTimingTransition(slideIn.current, {
        duration: ANIMATION_DURATION,
        easing: Easing.ease,
    });

    const SCREEN_WIDTH = Dimensions.get('window').width;

    const slideInTranslateX = interpolate(slideInAnimation, {
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, 0],
    });

    useCode(() => cond(eq(slideIn.current, 0), set(slideIn.current, 1)), []);

    return (
        <Animated.View style={[otpStyles.rootView, {transform: [{translateX: slideInTranslateX}]}]}>
            <TextInput
                style={otpStyles.input}
                keyboardType="number-pad"
                maxLength={5}
                returnKeyType="done"
            />
        </Animated.View>
    );
}
