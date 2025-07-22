// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { AuthContext } from '../context/AuthContext';

// Screens
import LogoScreen from '../screens/LogoScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import PartyDetailsScreen from '../screens/PartyDetailsScreen';
import SheetScreen from '../screens/SheetScreen';
import CreateSheetScreen from '../screens/CreateSheetScreen';
import AllSheetsScreen from '../screens/AllSheetsScreen';
import HeaderTabs from '../screens/HeaderTabs';
import SheetDetailScreen from '../screens/SheetDetailScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, skipped, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Flow */}
        {!user && !skipped ? (
          <>
            <Stack.Screen name="Logo" component={LogoScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}

        {/* Shared Screens — accessible after login/skip */}
        <Stack.Screen name="PartyDetails" component={PartyDetailsScreen} />
        <Stack.Screen name="SheetScreen" component={SheetScreen} />
        <Stack.Screen name="CreateSheetScreen" component={CreateSheetScreen} />
        <Stack.Screen name="AllSheetsScreen" component={AllSheetsScreen} />
        <Stack.Screen name ="HeaderTabls" component={HeaderTabs}/>
        <Stack.Screen name="SheetDetailScreen" component={SheetDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
