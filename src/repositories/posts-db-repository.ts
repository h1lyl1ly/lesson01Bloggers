import {postsCollection, PostsType} from "./db"



// export let posts: PostsType[] = [
//     {
//         id: 1,
//         title: 'About JS - 01',
//         shortDescription: 'it-incubator.eu',
//         content: 'privet',
//         bloggerId: 2,
//         bloggerName: 'Timur'
//     },
//     {
//         id: 2,
//         title: 'About JS - 01',
//         shortDescription: 'it-incubator.eu',
//         content: 'privet',
//         bloggerId: 3,
//         bloggerName: 'Timur'
//     },
//     {
//         id: 3,
//         title: 'About JS - 01',
//         shortDescription: 'it-incubator.eu',
//         content: 'privet',
//         bloggerId: 4,
//         bloggerName: 'Timur'
//     },
//     {
//         id: 4,
//         title: 'About JS - 01',
//         shortDescription: 'it-incubator.eu',
//         content: 'privet',
//         bloggerId: 5,
//         bloggerName: 'Timur'
//     },
//     {
//         id: 5,
//         title: 'About JS - 01',
//         shortDescription: 'it-incubator.eu',
//         content: 'privet',
//         bloggerId: 6,
//         bloggerName: 'Timur'
//     },
// ]

export const postsRepository = {
    async allPosts(): Promise<PostsType[]> {
        const posts: PostsType[] = await postsCollection.find().toArray()
        return posts
    },
    async getPostsById(id: number): Promise<PostsType | null> {
        const post: PostsType | null = await  postsCollection.findOne({id: id})
        return post
    },
    async createPost(newPost: PostsType): Promise<PostsType> {
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },
    async deletePost(id: number) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const result = await postsCollection.updateOne({id},{$set: {title: title, shortDescription: shortDescription, content: content, bloggerId: bloggerId } })
        console.log(result)
        return result.matchedCount === 1
    }
}

