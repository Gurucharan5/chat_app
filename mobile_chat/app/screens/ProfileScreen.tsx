import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet,Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadImage: React.FC<{ navigation: any }>  = ({ navigation }) =>  {
  console.log("coming inside")
  // const navigation = useNavigation()
  const [image, setImage] = useState('');
  const [pimage, setPimage] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const getImage = async () =>{
    console.log("------coming inside get image")
    const token = await AsyncStorage.getItem('authToken');
    const result = await fetch('http://localhost:3000/api/v1/profile/getimage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
          },
        });
    console.log(result)
    const profile = await result.json();
    console.log(profile)
    setPimage(profile.data.image);
    setUsername(profile.data.username);
    setStatus(profile.data.status);
  }
  // console.log(setPimage)
  
  const addImage= async()=>{
    console.log("coming inside add image")
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });
    console.log(JSON.stringify(_image));
    // if (!_image.canceled) {
    //     setImage(_image.assets[0].uri);
    //     try {
    //         const response = await axios.post(
    //           'http://localhost:3000/api/v1/users/image',
    //           {
    //             user: {
    //                 image,
    //             },
    //           }
    //         );
              
              
            
            
      
      
    //         // Handle successful login here (e.g., store user data in AsyncStorage)
      
    //         // Navigate to another screen (e.g., Dashboard) after successful login
            
    //       } catch (error) {
    //         console.error('Login failed', error);
    //       }
    // }
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
      try {
        // Retrieve the user's JWT token from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
    
        // Create a POST request to your Rails backend to create a post
        const response = await fetch('http://localhost:3000/api/v1/users/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
          },
          body: JSON.stringify({
            image: _image.assets[0].uri,
          }),
        });
    
        if (response.status === 201) {
          // Post created successfully
          // await navigation.navigate('Dashboard')
          getImage();
        } else {
          // Handle error cases
        }
      } catch (error) {
        // Handle any exceptions
      }
    }

  };
  

  
  useEffect(()=> {
    getImage();
  },[])
  return (

            <View style={imageUploaderStyles.test}>
              <View style={imageUploaderStyles.container}>
                  {
                      pimage  && <Image source={{ uri: pimage }} style={{ width: 200, height: 200 }} />
                  }
                      <View style={imageUploaderStyles.uploadBtnContainer}>
                          <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                              <AntDesign name="camera" size={20} color="black" />
                          </TouchableOpacity>
                          
                      </View>
                
                      
              </View>
              <View style ={imageUploaderStyles.username}>
                <TouchableOpacity>
                  <Text style={imageUploaderStyles.text}>
                    {username}
                  </Text>
                  <Text>
                    {status}
                  </Text>
                </TouchableOpacity>
              </View>

              
              
            </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    test:{
      
      alignItems: 'center',
      height:'100%'

    },
    username: {
      paddingTop: "10%",
      fontWeight: "bold",
      fontSize: 25
    },
    text:{
      fontWeight: "bold",
      fontSize: 25
    }
})


export default UploadImage;