import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';




function ChatScreen() {
    const [guid,setGuid] = useState('');

    const getChat = async() => {
        const token = await AsyncStorage.getItem('authToken');
    
        // Create a POST request to your Rails backend to create a post
        const response = await fetch('http://localhost:3000/api/v1/users/doxapi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
          },
          body: JSON.stringify({
            data: token
          }),
        });
    
        if (response.status === 201) {
          // Post created successfully
          // await navigation.navigate('Dashboard')
          console.log("success")
        } else {
          // Handle error cases
        }
    }

    useEffect(()=> {
        getChat();
      },[])

    return (
        <div>
            ChatScreen
        </div>
    );
}

export default ChatScreen;