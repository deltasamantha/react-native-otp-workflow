import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LanguagePickerCell from '../LanguagePickerCell/LanguagePickerCell';
import {SCREEN_WIDTH} from '../../util/ScreenUtils';
import {colorAccent} from '../../theme/Colors';
import {Transition, Transitioning} from 'react-native-reanimated';

export type LanguageKey = 'en' | 'si' | 'ta';

export default function LanguagePicker() {
    const [selectedLanguage, setLanguage] = useState<LanguageKey>('si');
    const selectLanguage = (key: LanguageKey) => {
        transitioningViewRef.current?.animateNextTransition();
        setLanguage(key);
    };

    const transitioningViewRef = useRef(null);

    const transition = (
        <Transition.Together>
            <Transition.Change />
        </Transition.Together>
    );

    return (
        <Transitioning.View
            style={styles.rootContainer}
            ref={transitioningViewRef}
            transition={transition}>
            <View
                style={{
                    position: 'absolute',
                    height: 40,
                    width: (SCREEN_WIDTH - 40) / 3,
                    backgroundColor: colorAccent,
                    left:
                        selectedLanguage === 'si'
                            ? 0
                            : selectedLanguage === 'ta'
                            ? (SCREEN_WIDTH - 40) / 3
                            : null,
                    right: selectedLanguage === 'en' ? 0 : null,
                }}
            />
            <LanguagePickerCell
                label="සිංහල"
                isSelected={selectedLanguage === 'si'}
                selectAction={() => {
                    selectLanguage('si');
                }}
            />
            <LanguagePickerCell
                label="தமிழ்"
                isSelected={selectedLanguage === 'ta'}
                selectAction={() => {
                    selectLanguage('ta');
                }}
            />
            <LanguagePickerCell
                label="English"
                isSelected={selectedLanguage === 'en'}
                selectAction={() => {
                    selectLanguage('en');
                }}
            />
        </Transitioning.View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        height: 40,
        width: SCREEN_WIDTH - 40,
        flexDirection: 'row',
        marginTop: 80,
        marginHorizontal: 20,
        backgroundColor: 'lightgray',
        borderRadius: 20,
        overflow: 'hidden',
    },
});
