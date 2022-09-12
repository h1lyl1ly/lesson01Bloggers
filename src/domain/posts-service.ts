import {postsRepository} from "../repositories/posts-db-repository"
import {PostsType} from "../repositories/db"
import {BloggerType} from "../repositories/db";


export const postsService = {
    async allPosts(): Promise<PostsType[]> {
        return postsRepository.allPosts()
    },
    async getPostsById(id: string): Promise<PostsType | null> {
        return postsRepository.getPostsById(id)

    },
    async createPost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogger: BloggerType): Promise<PostsType> {
        const newPost = {
            id: (+(new Date())).toString(),
            title,
            shortDescription,
            content,
            blogId: blogger.id,
            blogName: blogger.name,
            createdAt: new Date()
        }
        const createdPost = await postsRepository.createPost(newPost)
        return createdPost
    },
    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    }
}
