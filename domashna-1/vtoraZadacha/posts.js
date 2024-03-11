// Направете повик до https://jsonplaceholder.typicode.com/posts, потоа:

// Земете ги сите постови на одреден корисник според id пр. findUserPosts(1) -> returns [{}, {}, {}]

// const fetch = require("node-fetch")
const findUserPosts = async (userId) => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
        const userPosts = posts.filter(body => body.userId === userId);
        return (userPosts)
    }catch(err){
        console.log(err)
    }
}


(async () => {
    try {
        const userPosts = await findUserPosts(3);
        console.log(userPosts);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();




