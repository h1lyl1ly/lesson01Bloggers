import {bloggersRepository} from "../repositories/bloggers-db-repository"
import {BloggerType} from "../repositories/db";


export const bloggersService = {
    async allBloggers() {
        return bloggersRepository.allBloggers()
    },
    async getBloggerById(id: string): Promise<BloggerType | null> {
        return bloggersRepository.getBloggerById(id)

    },
    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType | null> {
        const newBlogger = {
            id: (+(new Date())).toString(),
            name,
            youtubeUrl,
            createdAt: new Date()
        }
        await bloggersRepository.createBlogger(newBlogger)
        return this.getBloggerById(newBlogger.id)

    },
    async deleteBlogger(id: string): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    },
    async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    }
}
