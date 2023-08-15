import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import CryptoChartScreen from './src/screens/CryptoChartScreen';
import CryptoListScreen from './src/screens/CryptoListScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

function MyNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CryptoList"
                    component={CryptoListScreen}
                    options={{
                        title: 'Listado de criptomonedas',
                        gestureEnabled: false,
                        headerLeft: () => null
                    }}
                />
                <Stack.Screen
                    name="CryptoChart"
                    component={CryptoChartScreen}
                    options={{
                        title: 'Detalle de criptomoneda',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyNavigation;
