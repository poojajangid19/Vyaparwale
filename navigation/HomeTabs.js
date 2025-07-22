// navigation/HomeTabs.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateSheetScreen from '../screens/CreateSheetScreen'; // First screen with 4 stone cards
import AllSheetsScreen from '../screens/AllSheetsScreen';     // Second screen (No sheets found)

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="CreateSheetScreen"
      screenOptions={{
        tabBarActiveTintColor: '#C4FF1A',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarIndicatorStyle: { backgroundColor: '#C4FF1A' },
        tabBarStyle: { backgroundColor: '#1E232C' },
      }}
    >
      <Tab.Screen name="CreateSheet" component={CreateSheetScreen} options={{ title: 'CreateSheetScreen' }} />
      <Tab.Screen name="AllSheets" component={AllSheetsScreen} options={{ title: 'All sheets' }} />
    </Tab.Navigator>
  );
}
