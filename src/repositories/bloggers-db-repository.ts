import {bloggersCollection, BloggerType} from "./db";


// вздрочнуть темму Promise
// .project({_id:0}


export const bloggersRepository = {
    async allBloggers() {
        const bloggers = await bloggersCollection.find({},{projection:{_id:false}}).toArray()
        return bloggers
    },
    async getBloggerById(id: string): Promise<BloggerType | null> {
        const blogger: BloggerType | null =  await bloggersCollection.findOne({id: id},{projection:{_id:0}})
        return blogger
    },
    async createBlogger(newBlogger: { createdAt: Date; youtubeUrl: string; name: string; id: string }): Promise<BloggerType | any> {
         await bloggersCollection.insertOne(newBlogger).then(res => res);
    },
    async deleteBlogger(id: string): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id},{$set: {name: name, youtubeUrl: youtubeUrl} })
        return result.matchedCount === 1
    }
}






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
