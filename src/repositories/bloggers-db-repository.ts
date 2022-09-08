import {bloggersCollection, BloggerType} from "./db";


// export const bloggersQuery = (req: Request): bloggersSearchParam => {
// const { pageNumber: pageNumberQuery,  pageSize: pageSizeQuery } = req.query
// const bloggerId = req.params.id ? req.params.id : null
// const pageNumber = pageNumberQuery ? +pageNumberQuery : 1
// const pageSize = pageSizeQuery ? +pageSizeQuery : 10
// const skip = pageSize * (pageNumber -1)
// const limit = (pageSize)

// ? - это тернарные выражения (загуглить), оператор

// export const searchTerm = req.params.searchTerm




// const searchNameTerm = "" передается как query
// const pageNumber = Math.ceil( countDocuments / pageSize) (как параметры) defalutl 1 (number)  передается как query
// const pageSize = defalutl 10 (number) передается как query

// countDocuments ( передать filter, которая будет находить searchNameTerm


export const bloggersRepository = {
    async allBloggers(): Promise<BloggerType[]> {
        const bloggers: BloggerType[] = await bloggersCollection.find().toArray()
        return bloggers
    },
    async getBloggerById(id: number): Promise<BloggerType | null> {
        const blogger: BloggerType | null =  await bloggersCollection.findOne({id: id})
        return blogger
    },
    async createBlogger(newBlogger: BloggerType): Promise<BloggerType> {
        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },
    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id},{$set: {name: name, youtubeUrl: youtubeUrl} })
        return result.matchedCount === 1
    }
}
