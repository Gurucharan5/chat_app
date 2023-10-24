import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect,useState} from 'react';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './app/screens/SignupScreen';
import LoginScreen from './app/screens/LoginScreen';
import ProfileScreen from './app/screens/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardScreen from './app/screens/DashboardScreen';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './app/components/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import PostScreen from './app/screens/PostScreen';
import { useIsFocused } from '@react-navigation/native';
import SplashScreen from './app/screens/SplashScreen';
import ChatScreen from './app/screens/ChatScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  // const isFocused = useIsFocused();
  const [authenticated, setAuthenticated] = useState(false);
  
  // 
  useEffect(() => {
    // Check for the presence of the token on app startup
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    
    checkAuthentication();
    
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Code to run when the screen gains focus
  //     console.log('Screen is focused');
      
  //     // You can perform actions here, such as fetching data or updating state
  //     // For example:
  //     // fetchData();
      
  //     // Clean up the event listener when the component unmounts
  //     return () => {
  //       console.log('Screen is unfocused');
        
  //       // Clean up any resources or remove listeners here
  //     };
  //   }, [])
  // );
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name='Chat' component={ChatScreen} />
          <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={({ navigation }) => ({
                  title: 'Dashboard',
                  headerRight: () => (
                    <Button
                      title="Logout"
                      onPress={async () => {
                        // Clear the token from AsyncStorage
                        await AsyncStorage.removeItem('authToken');
                        // Navigate to LoginScreen
                        // await setAuthenticated(false);
                        
                        const token = await AsyncStorage.getItem('authToken');
                        if (token) {
                          setAuthenticated(true);
                        } else {
                          await setAuthenticated(false);
                          navigation.navigate('Login');
                        }
                        
                      }}
                    />
                  ),
                  headerLeft: () => (
                    <Button
                      title="Profile"
                      onPress={() => {
                        // Navigate to ProfileScreen
                        navigation.navigate('Profile');
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: 'blue', // Customize the header background color
                  },
                  headerTintColor: 'white', // Customize the text color in the header
                })}
              />
        
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    
    
      // <NavigationContainer>
      //   <Stack.Navigator>
      //   {authenticated ? (
      //       <>
              

              
      //         {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
              
      //         {/* <Stack.Screen
      //         name="Dashboard"
      //         component={DashboardScreen}
      //         options={{
      //           headerRight: () => (
      //             <Button
      //               title="Logout"
      //               onPress={async () => {
      //                 // Clear the token from AsyncStorage
      //                 await AsyncStorage.removeItem('authToken');
      //                 setAuthenticated(false);
      //                 // Navigate to LoginScreen
                     
      //               }}
      //             />
      //           ),
      //         }}
      //       /> */}
      //         <Stack.Screen name='Splash' component={SplashScreen}/>
              // <Stack.Screen
              //   name="Dashboard"
              //   component={DashboardScreen}
              //   options={({ navigation }) => ({
              //     title: 'Dashboard',
              //     headerRight: () => (
              //       <Button
              //         title="Logout"
              //         onPress={async () => {
              //           // Clear the token from AsyncStorage
              //           await AsyncStorage.removeItem('authToken');
              //           // Navigate to LoginScreen
              //           // await setAuthenticated(false);
                        
              //           const token = await AsyncStorage.getItem('authToken');
              //           if (token) {
              //             setAuthenticated(true);
              //           } else {
              //             await setAuthenticated(false);
              //             navigation.navigate('Login');
              //           }
                        
              //         }}
              //       />
              //     ),
              //     headerLeft: () => (
              //       <Button
              //         title="Profile"
              //         onPress={() => {
              //           // Navigate to ProfileScreen
              //           navigation.navigate('Profile');
              //         }}
              //       />
              //     ),
              //     headerStyle: {
              //       backgroundColor: 'blue', // Customize the header background color
              //     },
              //     headerTintColor: 'white', // Customize the text color in the header
              //   })}
              // />
      //         <Stack.Screen name="Post" 
      //         component={PostScreen} 
              
      //         />
      //         <Stack.Screen name="Profile" 
      //         component={ProfileScreen} 
              
      //         />

              
              
              
      //       </>
            
      //     ) : (
      //       <>
      //         <Stack.Screen name="Signup" component={SignupScreen} />
      //         <Stack.Screen 
      //         name="Login" 
      //         component={LoginScreen} 
              
      //         />
              
              
      //       </>
      //     )}
          
      //   </Stack.Navigator>
      // </NavigationContainer>
    
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
