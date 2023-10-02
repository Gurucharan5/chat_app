// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen: React.FC<{ navigation: any }>  = ({ navigation }) => { // Add navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/login',
        {
          user: {
            email,
            password,
          },
        }
      );

      const { token } = response.data;

      // Store the token securely in AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      if (response.status == 200) {
        navigation.navigate('Profile');
      }
      else {
        window.alert('email or password is wrong')
      }


      // Handle successful login here (e.g., store user data in AsyncStorage)

      // Navigate to another screen (e.g., Dashboard) after successful login
      
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style = {styles.title}>
      <Text>Login</Text>
      <TextInput
        style = {styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style = {styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 150,
      color: "#73756f",
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    title: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })

export default LoginScreen;
