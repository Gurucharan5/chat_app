import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity,TextInput,StyleSheet } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';


function PostScreen({navigation}:{navigation: any}) {
  const [imageUri, setImageUri] = useState('');
  const [content , setContent] = useState('');
  

  const pickImage = async() => {
    const token = await AsyncStorage.getItem('authToken');
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5,3],
    });
    console.log(_image);
    if (!_image.canceled) {
        setImageUri(_image.assets[0].uri);
    }
    console.log(token)
  };

  

  const createPost = async() => {
    // Send the image and post data to your Rails backend here
    // Handle the response accordingly (e.g., show a success message)
    try {
        // Retrieve the user's JWT token from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
    
        // Create a POST request to your Rails backend to create a post
        const response = await fetch('http://localhost:3000/api/v1/posts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
          },
          body: JSON.stringify({
            content: content,
            image: imageUri,
          }),
        });
    
        if (response.status === 201) {
          // Post created successfully
          await navigation.navigate('Dashboard')
        } else {
          // Handle error cases
        }
      } catch (error) {
        // Handle any exceptions
      }
  };

  return (
    <View>
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
        <TouchableOpacity onPress={pickImage}>
            <Text>Select Image</Text>
            <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.comment}>
            <TextInput
                multiline
                style = {styles.input}         
                numberOfLines={4}
                
                placeholder="Enter whatever you thing"
                value={content}
                onChangeText={(text) => setContent(text)}
            />
        </View>
        <Button title="Create Post" onPress={createPost} />
    </View>
  );
};
const styles = StyleSheet.create({
    comment: {
        
        color: "#73756f",
        marginBottom: 10,
        backgroundColor: "#fff", 
        padding: 10,

        
        
    },
    input:{
        borderColor: "#73AD21",
    }
})

export default PostScreen;
