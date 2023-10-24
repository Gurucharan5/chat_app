import React from 'react';
import { Card,Paragraph } from 'react-native-paper';


interface BlogPostProps {
    content: string;
    image: string;
    username: string;
}
function PageScreen(props: BlogPostProps) {
    return (
        <Card>
            <Card.Title  title={props.username}/>
            <Card.Content>
                <Paragraph>{props.content}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: props.image}}/>

        </Card>
    );
}

export default PageScreen;