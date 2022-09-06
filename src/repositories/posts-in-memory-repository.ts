import {bloggers} from "./bloggers-in-memory-repository";

export type PostsType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}


export let posts: PostsType[] = [
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
    async allPosts(): Promise<PostsType[]> {
        return posts
    },
    async getPostsById(id: number): Promise<PostsType | null> {
        const post = posts.find(post => post.id === id)
        if (post) {
            return post
        } else {
            return null
        }
    },
    async createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
        const blogger = bloggers.find(bloggers => bloggers.id === bloggerId)
        if (!blogger) return false
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: blogger.name,
            createdAt: new Date()
        }
        posts.push(newPost)
        return newPost
    },
    async deletePost(id: number) {
        const postIndex = posts.findIndex((post) => post.id === id)
        if (postIndex === -1) return false
        posts = posts.filter(post => post.id !== id)
        return true
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
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
    }
}

