import React, {useRef} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colorBlackish} from '../../theme/Colors';
import {LanguageKey} from '../LanguagePicker/LanguagePicker';

const FLAG_EMOJI = '🇱🇰';
const COUNTRY_CODE = '+94';

interface MobileInputViewProps {
    submitText: (text: string) => void;
    textInputRef: any;
    selectedLanguage: LanguageKey;
}

export function MobileInputView({
    submitText,
    textInputRef,
    selectedLanguage,
}: MobileInputViewProps) {
    return (
        <View style={styles.mobileInputContainer} pointerEvents={'none'}>
            <Text style={styles.countryCode}>{`${FLAG_EMOJI} ${COUNTRY_CODE}`}</Text>
            <TextInput
                ref={textInputRef}
                style={styles.numberInput}
                placeholder={'Enter your mobile number'}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={({nativeEvent: {text}}) => submitText(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mobileInputContainer: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        fontSize: 16,
        marginRight: 15,
        color: colorBlackish,
    },
    numberInput: {
        flex: 1,
        height: 40,
        borderWidth: 0.5,
        paddingHorizontal: 5,
        fontSize: 16,
    },
});
