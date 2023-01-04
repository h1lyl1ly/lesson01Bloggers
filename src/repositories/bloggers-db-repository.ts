import {bloggersCollection, BloggerType} from "./db";



// type sortedBy = {
//     direction: 'asc' | 'desc'
// }



const queryParams = (queryBloggersParams: any) => {
    let searchNameTerm = typeof queryBloggersParams.searchNameTerm === "string" ? queryBloggersParams.searchNameTerm : ""
    let pageSize = typeof queryBloggersParams.pageSize === 'string' ? +queryBloggersParams.pageSize : 10
    let pageNumber =typeof queryBloggersParams.pageSize === 'string' ? +queryBloggersParams.pageNumber : 1
    let limit = pageSize
    let skip = pageSize * (pageNumber - 1)
    return {searchNameTerm, pageSize, pageNumber, limit, skip}
}



// function paginate<T>(items:T,queryParamsInfo)=>{
//     let obj = {
//         pagesCount: Math.ceil(totalCount / pageSize),
//         page: pageNumber,
//         pageSize,
//         totalCOunt: bloggers.le,
//         bloggers
//     }
//
// }





export const bloggersRepository = {
    async allBloggers(query: any) {
        let queryParamsInfo = queryParams(query)
        const bloggers = await bloggersCollection
            .find({projection:{_id:false}, name: {$regex: queryParamsInfo.searchNameTerm}})
            .skip(queryParamsInfo.skip)
            .limit(queryParamsInfo.pageSize)
            .toArray()
       // const res = paginate<BloggerType>(bloggers,queryParamsInfo)
       //  let obj = {
       //      pagesCount: Math.ceil(totalCount / pageSize),
       //      page: pageNumber,
       //      pageSize,
       //      totalCount: bloggers.length,
       //      bloggers
       //  }
       //  return obj
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
































// const bloggersQuery = (req: Request): bloggersSearchParam => {
//
// }
// let searchTerm = req.query.searchTerm
// let pageSize:number = +req.query.pageSize : 10
// let pageNumber: number = +req.query.pageNumber : 1
// let skip:number = pageSize * (pageNumber - 1)
// let limit = pageSize
//
//
//
//
// let bloggerId: number = +req.query.id



// let skip:number = pageSize * (pageNumber - 1)
// let limit = pageSize








// const pageNumber = Math.ceil( countDocuments / pageSize) (как параметры) defalutl 1 (number)  передается как query
// countDocuments ( передать filter, которая будет находить searchNameTerm
