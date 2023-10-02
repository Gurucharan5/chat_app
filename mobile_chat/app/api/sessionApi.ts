const API_URL = "http://localhost:3000/api/v1/";

export interface Post {
    id: number;
    title: string;
    body: string;
}

export async function getPosts() {
    console.log("uvction  dtatsay")
    const requestInfo = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    console.log("reuest")
    console.log(requestInfo)
    const response = await fetch(`${API_URL}posts/getpost`, requestInfo);
    console.log(response)
    const posts = await response.json();
    console.log("API");
    console.log(posts);
    return posts;
    
}