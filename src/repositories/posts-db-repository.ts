import {postsCollection, PostsType} from "./db"


export const postsRepository = {
    async allPosts(): Promise<PostsType[]> {
        const posts: PostsType[] = await postsCollection.find().toArray()
        return posts
    },
    async getPostsById(id: string): Promise<PostsType | null> {
        const post: PostsType | null = await  postsCollection.findOne({id: id})
        return post
    },
    async createPost(newPost: { createdAt: Date; blogName: string; id: string; shortDescription: string; title: string; blogId: string; content: string }): Promise<PostsType> {
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id},{$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId } })
        console.log(result)
        return result.matchedCount === 1
    }
}

