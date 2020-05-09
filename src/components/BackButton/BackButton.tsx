import React from 'react';
import {View, Image} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {styles} from './BackButton.styles';
import {TapGestureHandler} from 'react-native-gesture-handler';

const BACK_ICON = require('../../resources/icons/back-arrow.png');

interface BackButtonProps {
    isOpenAnimation: Animated.Node<number>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
}

export default function BackButton({isOpenAnimation, gestureHandler}: BackButtonProps) {
    const buttonOpacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1],
    });
    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View style={[styles.buttonContainer, {opacity: buttonOpacity}]}>
                <Image source={BACK_ICON} style={styles.button} />
            </Animated.View>
        </TapGestureHandler>
    );
}
