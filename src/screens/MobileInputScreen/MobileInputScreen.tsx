import React, {useRef} from 'react';
import {View} from 'react-native';
import Logo from '../../components/Logo/Logo';
import Animated, {
    Value,
    interpolate,
    Easing,
    useCode,
    cond,
    eq,
    set,
    call,
    SpringUtils,
} from 'react-native-reanimated';
import {
    withTimingTransition,
    onGestureEvent,
    delay,
    withSpringTransition,
} from 'react-native-redash';
import {State} from 'react-native-gesture-handler';
import {MobileInputView} from '../../components/MobileInputView/MobileInputView';
import BackButton from '../../components/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import {styles, SCREEN_HEIGHT} from './MobileInputScreen.styles';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';

const INPUT_VIEW_HEIGHT = 200;
const IN_ANIMATION_DURATION = 500;

export default function MobileInputScreen() {
    const navigation = useNavigation();
    const textInputRef = useRef(null);
    const scale = useRef(new Value(0));
    const scaleAnimation = withTimingTransition(scale.current, {
        duration: IN_ANIMATION_DURATION,
        easing: Easing.ease,
    });

    const inputViewTranslation = useRef(new Value(0));
    const inputViewTranslationAnimation = withTimingTransition(inputViewTranslation.current, {
        duration: IN_ANIMATION_DURATION,
        easing: Easing.ease,
    });

    const inputViewTranslationY = interpolate(inputViewTranslationAnimation, {
        inputRange: [0, 1, 2],
        outputRange: [SCREEN_HEIGHT, SCREEN_HEIGHT - INPUT_VIEW_HEIGHT, 0],
    });

    const gestureState = useRef(new Value(State.UNDETERMINED));
    const gestureHandler = onGestureEvent({state: gestureState.current});

    const isOpen = useRef(new Value(0));
    const isOpenAnimation = withSpringTransition(isOpen.current, {
        ...SpringUtils.makeDefaultConfig(),
        overshootClamping: true,
        damping: new Value(20),
    });

    const backButtonGestureState = useRef(new Value(State.UNDETERMINED));
    const backButtonGestureHandler = onGestureEvent({state: backButtonGestureState.current});

    const languagePickerTranslateY = interpolate(scaleAnimation, {
        inputRange: [0, 1],
        outputRange: [-60, 0],
    });

    useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

    useCode(
        () => [cond(eq(inputViewTranslation.current, 0), set(inputViewTranslation.current, 1))],
        [],
    );

    useCode(
        () =>
            cond(eq(gestureState.current, State.END), [
                set(backButtonGestureState.current, State.UNDETERMINED),
                cond(eq(inputViewTranslation.current, 1), [
                    set(inputViewTranslation.current, 2),
                    cond(eq(isOpen.current, 0), set(isOpen.current, 1)),
                ]),
                cond(eq(inputViewTranslation.current, 2), delay(call([], focusTextInput), 300)),
            ]),
        [gestureState.current],
    );

    useCode(
        () =>
            cond(eq(backButtonGestureState.current, State.END), [
                set(gestureState.current, State.UNDETERMINED),
                cond(eq(isOpen.current, 1), delay(set(isOpen.current, 0), 250)),
                cond(eq(inputViewTranslation.current, 2), set(inputViewTranslation.current, 1)),
                call([], blurTextInput),
            ]),
        [backButtonGestureState.current],
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
                style={[styles.inputView, {transform: [{translateY: inputViewTranslationY}]}]}>
                <MobileInputView
                    submitText={submitText}
                    textInputRef={textInputRef}
                    isOpenAnimation={isOpenAnimation}
                    gestureHandler={gestureHandler}
                />
            </Animated.View>
        </View>
    );
}
