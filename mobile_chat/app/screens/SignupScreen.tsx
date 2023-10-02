// SignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet ,Button } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import LoginScreen from './LoginScreen';

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    if (!email) {
      Alert.alert('Error', 'Email cannot be empty');
      window.alert('Error: Email cannot be empty');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/signup', // Replace with your Rails signup endpoint
        {
          user: {
            email,
            password,
            username,
          },
        }
      );
      console.log(response)
      

      if (response.status === 201) {
        // HTTP status code 201 indicates a successful signup (Created)
        console.log('Signup successful');
        
        // Handle successful signup here, such as storing user data in AsyncStorage
        // You can also display a success message to the user
        // For example:
        // Alert.alert('Signup Successful', 'You can now log in.');
  
        // Navigate to another screen (e.g., Login) after successful signup
        navigation.navigate('Login');
      }else if (response.status == 205){
        console.error('already exists')
        window.alert('Already exists')
      } else {
        // Handle other response statuses (e.g., validation errors)
        console.error('Signup failed. Server returned:', response.status);
        // You can also handle specific error messages from the server if available in the response data.
      }

      // Handle successful signup here (e.g., store user data in AsyncStorage)

      // Navigate to another screen (e.g., Login) after successful signup
      // navigation.navigate('Login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const handleLogin =async () => {
    navigation.navigate('Login');
  }

  return (
    <View style = {styles.title}>
      <Text>Signup</Text>
      <TextInput
        style = {styles.input}
        placeholder="UserName"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
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
      <Button title="Signup" onPress={handleSignup} />
      <Text>Already Have an Account</Text>
      <Button title = "Login" onPress={handleLogin}/>
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

export default SignupScreen;
