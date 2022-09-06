import {bloggersRepository} from "../repositories/bloggers-db-repository"
import {BloggerType} from "../repositories/db";

// export const searchTerm = req.params.searchTerm

export const bloggersService = {
    async allBloggers(): Promise<BloggerType[]> {
        return bloggersRepository.allBloggers()
    },
    async getBloggerById(id: number): Promise<BloggerType | null> {
        return bloggersRepository.getBloggerById(id)

    },
    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            сreatedAt: new Date()
        }
        const createdBlogger = await bloggersRepository.createBlogger(newBlogger)
        return createdBlogger
    },
    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    }
}
