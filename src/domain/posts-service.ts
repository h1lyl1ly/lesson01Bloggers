import {postsRepository} from "../repositories/posts-db-repository"
import {PostsType} from "../repositories/db"
import {BloggerType} from "../repositories/db";


export const postsService = {
    async allPosts(): Promise<PostsType[]> {
        return postsRepository.allPosts()
    },
    async getPostsById(id: number): Promise<PostsType | null> {
        return postsRepository.getPostsById(id)

    },
    async createPost(title: string, shortDescription: string, content: string, blogger: BloggerType): Promise<PostsType> {
        const newPost = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId: blogger.id,
            bloggerName: blogger.name,
            createdAt: new Date()
        }
        const createdPost = await postsRepository.createPost(newPost)
        return createdPost
    },
    async deletePost(id: number): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    }
}
