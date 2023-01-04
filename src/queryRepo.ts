// const bloggersQueryRepo = {
//
//     getBloggers(): BloggerViewModel[] {
//         const dbBloggers: DBBloggers[] = []
//
//         return dbBloggers.map(dbBloggers => {
//             return {
//                 id: dbBloggers.id,
//                 name: '',
//                 youtubeUrl: dbBloggers.youtubeUrl
//
//             }
//         })
//     }
// }
//
//
// type DBBloggers = {
//     id: string
//     name: string
//     youtubeUrl: string
//     createdAt: Date
// }
//
//
// type BloggerViewModel = {
//
//     pagesCount: 0,
//     page: 0,
//     pageSize: 0,
//     totalCount: 0,
//     items: [
//         {
//             id: "string",
//             name: "string",
//             youtubeUrl: "string",
//             createdAt: "2022-09-19T08:36:58.122Z"
//         }
//     ]
// }