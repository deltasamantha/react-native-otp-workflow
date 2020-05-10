import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {styles, MOBILE_INPUT_HEIGHT} from './MobileInputScreen.styles';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../components/Logo/Logo';
import Animated, {
    Value,
    useCode,
    cond,
    eq,
    set,
    Easing,
    interpolate,
    SpringUtils,
    call,
} from 'react-native-reanimated';
import {
    withTimingTransition,
    onGestureEvent,
    withSpringTransition,
    interpolateColor,
    delay,
} from 'react-native-redash';
import {colorWhite, colorPrimary} from '../../theme/Colors';
import {SCREEN_HEIGHT} from '../../util/ScreenUtils';
import {TextInput, TapGestureHandler, State} from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton/BackButton';
import LanguagePicker, {LanguageKey} from '../../components/LanguagePicker/LanguagePicker';
import {MobileInputView} from '../../components/MobileInputView/MobileInputView';
const ANIMATION_DURATION = 400;

export default function MobileInputScreen() {
    const navigation = useNavigation();
    const textInputRef = useRef(null);
    const scale = useRef(new Value(0));
    const scaleAnimation = withTimingTransition(scale.current, {
        duration: ANIMATION_DURATION,
        easing: Easing.ease,
    });
    const innerTranslateY = interpolate(scaleAnimation, {
        inputRange: [0, 1],
        outputRange: [MOBILE_INPUT_HEIGHT, 0],
    });

    const gestureState = useRef(new Value(State.UNDETERMINED));
    const gestureHandler = onGestureEvent({state: gestureState.current});
    const backButtonGestureState = useRef(new Value(State.UNDETERMINED));
    const backButtonGestureHandler = onGestureEvent({state: backButtonGestureState.current});
    const isOpen = useRef(new Value(0));
    const isOpenAnimation = withSpringTransition(isOpen.current, {
        ...SpringUtils.makeDefaultConfig(),
        overshootClamping: true,
        damping: new Value(20),
    });

    const outerTranslateY = interpolate(isOpenAnimation, {
        inputRange: [0, 1],
        outputRange: [SCREEN_HEIGHT - MOBILE_INPUT_HEIGHT, MOBILE_INPUT_HEIGHT / 2],
    });

    const overlayTranslationY = interpolate(isOpenAnimation, {
        inputRange: [0, 1],
        outputRange: [SCREEN_HEIGHT - MOBILE_INPUT_HEIGHT, -MOBILE_INPUT_HEIGHT],
    });

    const overlayBackgroundColor = interpolateColor(isOpenAnimation, {
        inputRange: [0, 0.1, 1],
        outputRange: [colorPrimary, colorWhite, colorWhite],
    });

    const languagePickerTranslateY = interpolate(scaleAnimation, {
        inputRange: [0, 1],
        outputRange: [-60, 0],
    });

    useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);
    useCode(
        () =>
            cond(eq(gestureState.current, State.END), [
                cond(eq(isOpen.current, 0), set(isOpen.current, 1)),
                cond(eq(isOpen.current, 1), delay(call([], focusTextInput), 300)),
            ]),
        [gestureState.current],
    );
    useCode(
        () =>
            cond(eq(backButtonGestureState.current, State.END), [
                set(gestureState.current, State.UNDETERMINED),
                call([], blurTextInput),
                delay(set(isOpen.current, 0), 250),
            ]),
        [],
    );

    const focusTextInput = () => {
        textInputRef.current?.focus();
    };

    const blurTextInput = () => {
        textInputRef.current?.blur();
    };

    const submitText = (text: string) => {
        console.log(`Mobile number ${text}`);
        if (!!text) {
            navigation.navigate('Otp');
        }
    };

    const selectLanguage = (key: LanguageKey) => {
        setLanguage(key);
    };
    const [selectedLanguage, setLanguage] = useState<LanguageKey>('si');

    return (
        <View style={styles.rootContainer}>
            <BackButton
                isOpenAnimation={isOpenAnimation}
                gestureHandler={backButtonGestureHandler}
            />
            <Animated.View
                style={[
                    styles.languagePickerContainer,
                    {transform: [{translateY: languagePickerTranslateY}]},
                ]}>
                <LanguagePicker />
            </Animated.View>
            <Logo scale={scaleAnimation} />

            <Animated.View
                style={[styles.outerInputContainer, {transform: [{translateY: outerTranslateY}]}]}>
                <Animated.View
                    style={[
                        styles.overLay,
                        {backgroundColor: overlayBackgroundColor},
                        {transform: [{translateY: overlayTranslationY}]},
                    ]}
                />
                <Animated.View
                    style={[
                        styles.innerInputContainer,
                        {transform: [{translateY: innerTranslateY}]},
                    ]}>
                    <Text style={styles.introText}>Expand with sri</Text>
                    <TapGestureHandler {...gestureHandler}>
                        <Animated.View>
                            <MobileInputView
                                submitText={submitText}
                                textInputRef={textInputRef}
                                selectedLanguage="si"
                            />
                        </Animated.View>
                    </TapGestureHandler>
                </Animated.View>
            </Animated.View>
        </View>
    );
}
