import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './app/screens/SignupScreen';
import LoginScreen from './app/screens/LoginScreen';
import ProfileScreen from './app/screens/ProfileScreen'



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name = "Signup" component={SignupScreen}/>
        <Stack.Screen name = "Login" component={LoginScreen} />
        <Stack.Screen name = "Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
