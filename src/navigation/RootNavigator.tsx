import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MobileInputScreen from '../screens/MobileInputScreen/MobileInputScreen';
import OtpScreen from '../screens/OtpScreen/OtpScreen';

type AuthStackParamList = {
    MobileInput: undefined;
    Otp: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator headerMode="none">
                <AuthStack.Screen name="MobileInput" component={MobileInputScreen} />
                <AuthStack.Screen name="Otp" component={OtpScreen} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}
