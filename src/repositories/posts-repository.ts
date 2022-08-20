import {bloggers} from "./bloggers-repository";

export let posts = [
    {
        id: 1,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 2,
        bloggerName: 'Timur'
    },
    {
        id: 2,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 3,
        bloggerName: 'Timur'
    },
    {
        id: 3,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 4,
        bloggerName: 'Timur'
    },
    {
        id: 4,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 5,
        bloggerName: 'Timur'
    },
    {
        id: 5,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 6,
        bloggerName: 'Timur'
    },
]

export const postsRepository = {
    allPosts() {
        return posts
    },
    getPostsById(id: number) {
        const post = posts.find(post => post.id === id)
        return post
    },
    createPost(title: string, shortDescription: string, content: string, bloggerId: number, bloggerName: string) {
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: bloggerName
        }
        posts.push(newPost)
        return newPost
    },
    deletePost(id: number) {
        const postIndex = posts.findIndex((post) => post.id === id)
        if (postIndex === -1) return false
        posts = posts.filter(post => post.id !== id)
        return true
    },
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const post = posts.find(post => post.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = bloggerId
            return true
        } else {
            return false
        }
    },
    deleteAllData() {
        function empty() {
            posts = [];
        }   empty()
    }
}

