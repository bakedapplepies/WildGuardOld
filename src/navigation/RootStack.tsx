import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BottomTab from './BottomTab';

const RootStack = () => {
  const RootStack = createNativeStackNavigator();

  const navTheme = DefaultTheme;
  navTheme.colors.background = "#FFFFFF";

  return (
    <>
      <StatusBar style='auto'/>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false, navigationBarHidden: true }}>
          {/* No auth for now */}
          
          <RootStack.Screen name="BottomTab" component={BottomTab}/>

        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default RootStack;