import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {LanguageKey} from '../LanguagePicker/LanguagePicker';
import Animated, {interpolate} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {styles, INPUT_FONT_SIZE} from './MobileInputView.styles';

const FLAG_EMOJI = '🇱🇰';
const COUNTRY_CODE = '+94';

interface MobileInputViewProps {
    submitText: (text: string) => void;
    textInputRef: any;
    selectedLanguage: LanguageKey;
    isOpenAnimation: Animated.Node<number>;
    gestureHandler: any;
}

export function MobileInputView({
    submitText,
    textInputRef,
    isOpenAnimation,
    gestureHandler,
}: MobileInputViewProps) {
    const inputViewOpacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1],
    });

    const placeholderOpacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.7, 1],
        outputRange: [1, 0, 0],
    });

    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View>
                <View pointerEvents={'none'}>
                    <Animated.View style={{opacity: placeholderOpacity}}>
                        <Text style={styles.label}>{'Get flourish with Sri'}</Text>
                        <View style={styles.mobileInputContainer}>
                            <Text
                                style={styles.countryCode}>{`${FLAG_EMOJI} ${COUNTRY_CODE}`}</Text>
                            <Text style={{fontSize: INPUT_FONT_SIZE}}>
                                {'Enter your mobile number'}
                            </Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={{opacity: inputViewOpacity}}>
                        <Text style={styles.label}>{'Enter your mobile number'}</Text>
                        <View style={styles.mobileInputContainer}>
                            <Text
                                style={styles.countryCode}>{`${FLAG_EMOJI} ${COUNTRY_CODE}`}</Text>
                            <TextInput
                                ref={textInputRef}
                                style={[styles.numberInput, styles.activeInput]}
                                placeholder={'Enter your mobile number'}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                onSubmitEditing={({nativeEvent: {text}}) => submitText(text)}
                            />
                        </View>
                    </Animated.View>
                </View>
            </Animated.View>
        </TapGestureHandler>
    );
}
