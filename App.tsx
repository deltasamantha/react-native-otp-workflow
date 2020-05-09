/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {styles} from './App.styles';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            {/* <SafeAreaView style={styles.rootContainer}> */}
            <RootNavigator />
            {/* </SafeAreaView> */}
        </>
    );
};

export default App;
