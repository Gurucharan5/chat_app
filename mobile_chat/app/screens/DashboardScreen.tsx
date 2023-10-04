import React from 'react';
import { View,Text,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import PageScreen from './PageScreen';
import { getPosts } from '../api/sessionApi';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

// const DashboardScreen: React.FC<{ navigation: any }>  = ({ navigation }) => {
    
//     const handleLogout = async () => {
//         // Implement your logout logic here, e.g., clear AsyncStorage
//         await AsyncStorage.clear();
//         // Navigate to the Login screen
//         navigation.navigate('Login');
        
//       };
//     return (
//         <View>
//         <Text>Welcome to the Home Screen!</Text>
//         <Button title="Logout" onPress={handleLogout} />
//         </View>
//     );
// }
function DashboardScreen({navigation}:{navigation: any}) {
    const createPost = async () => {
        // Implement your logout logic here, e.g., clear AsyncStorage
       
        // Navigate to the Login screen
        navigation.navigate('Post');
        
      };

 
    const [posts, setPosts] = useState([]);
    const isFocused = useIsFocused();
    useEffect(()=> {
        // getPosts().then((posts)=> setPosts(posts))
        // Fetch posts only when the screen is focused
        if (isFocused) {
            getPosts().then((posts) => setPosts(posts));
        }
  
    },[isFocused])
    return (
        <View>
            <View>
                <Text>Welcome to the Home Screen!</Text>
                <Button title="CreatePOst" onPress={createPost} />
            </View>
            <View>
                <ScrollView>
                    <SafeAreaView>
                        {posts && posts.map((post: any) =>(
                            <View key = {post.id}>
                                <PageScreen content = {post.content} image={post.image} username={post.username}/>
                            </View>
                        ))}
                    </SafeAreaView>
                </ScrollView>
            </View>
        
        
        </View>
    );
}


export default DashboardScreen;