import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LanguageKey} from '../LanguagePicker/LanguagePicker';

interface LanguagePickerCellProps {
    label: string;
    isSelected?: boolean;
    selectAction: any;
}

export default function LanguagePickerCell({
    label,
    isSelected,
    selectAction,
}: LanguagePickerCellProps) {
    return (
        <TouchableOpacity style={styles.rootContainer} onPress={selectAction}>
            <Text style={[styles.label, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
    },
});
