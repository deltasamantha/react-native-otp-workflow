import React from 'react';
import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {styles} from './Logo.styles';

export default function Logo({scale}) {
    return (
        <Animated.View style={[styles.logoContainer, {transform: [{scale: scale}]}]}>
            <Text style={styles.text}>{'ශ්‍රී'}</Text>
        </Animated.View>
    );
}
