import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function UploadImage() {
  console.log("coming inside")
  const [image, setImage] = useState('');
  const [pimage, setPimage] = useState('');
  const getImage = async () =>{
    console.log("------coming inside get image")
    const result = await axios.post(
      'http://localhost:3000/api/v1/users/image',
      {
        user: {
            image,
        },
      }
    );
    console.log(result.data)
    setPimage(result.data);
  }
  console.log(setPimage)
  
  const addImage= async()=>{
    console.log("coming inside add image")
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
        setImage(_image.assets[0].uri);
        try {
            const response = await axios.post(
              'http://localhost:3000/api/v1/users/image',
              {
                user: {
                    image,
                },
              }
            );
              
              
            
            
      
      
            // Handle successful login here (e.g., store user data in AsyncStorage)
      
            // Navigate to another screen (e.g., Dashboard) after successful login
            
          } catch (error) {
            console.error('Login failed', error);
          }
    }
  };
  useEffect(()=> {
    getImage();
  },[])
  return (
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
    }
})