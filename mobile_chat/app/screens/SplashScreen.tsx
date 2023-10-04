import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function SplashScreen({navigation} : {navigation: any}) {
    const [authenticated, setAuthenticated] = useState(false);
    // const navigation = useNavigation();
  
  // 
  useEffect(() => {
    // Check for the presence of the token on app startup
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthenticated(true);
        navigation.navigate('Dashboard')
      } else {
        setAuthenticated(false);
        navigation.navigate('Login')

      }
    };
    
    checkAuthentication();
    
  }, []);
    return (
        <div>
            <ActivityIndicator />
            
        </div>
    );
}

export default SplashScreen;