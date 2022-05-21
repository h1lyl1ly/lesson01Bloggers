// import {Request, Response, Router} from "express";
// import {body} from "express-validator";
// let posts = [
//     {id: 1, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'privet', bloggerId: 1, bloggerName: 'Timur'},
//     {id: 2, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'privet', bloggerId: 2, bloggerName: 'Timur'},
//     {id: 3, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'privet', bloggerId: 3, bloggerName: 'Timur'},
//     {id: 4, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'privet', bloggerId: 4, bloggerName: 'Timur'},
//     {id: 5, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'privet', bloggerId: 5, bloggerName: 'Timur'},
// ]
//
// export const postsRouter = Router({})
//
// // const titleValidation = body('string').isLength({min:0, max:15})
// // const shortDescriptionValidation = body('string')
// // const contentValidation =
// // const bloggerIdValidation =
// // const bloggerNameValidation =
//
// postsRouter.get('/', (req: Request, res: Response ) => {
//     res.status(200).send(posts)
// })
// postsRouter.get('/:id', (req: Request, res: Response) => {
//     const id = +req.params.id
//     const post = posts.find((post) => {
//         if (post.id === id) return true;
//         else return false;
//     })
//     if (post !== undefined) {
//         res.status(200).send(post)
//     } else {
//         res.status(404).send()
//     }
// })
// postsRouter.post('/', (req: Request, res: Response) => {
//     const newPost = {
//         id: +(new Date()),
//         name: req.body.name,
//         youtubeUrl: req.body.youtubeUrl
//     }
//
//     if (typeof req.body.name === "string" && req.body.name.length > 0 && req.body.name.length <= 15) {
//         res.status(201).send(newPost)
//         posts.push(newPost)
//     } else {
//         res.status(400).send({
//             "errorsMessages": [
//                 {
//                     "message": "Title is required",
//                     "field": "name"
//                 }
//             ],
//             "resultCode": 1
//         })
//     }
// })
// postsRouter.delete('/:id',(req: Request, res: Response)=> {
//     const postIndex = posts.findIndex((post) => post.id === +req.params.id)
//     if(postIndex === -1) return res.status(404).send()
//     posts = posts.filter(blogger => blogger.id !== +req.params.id)
//     res.status(204).send()
// })
// postsRouter.put('/:id',(req: Request, res: Response)=>{
//     const id = +req.params.id
//     const post = posts.find((post) => {
//         if (post.id === id) return true;
//         else return false;
//     })
//     if (!post) {
//         res.status(404).send()
//     }
//     if (post && typeof req.body.name === "string" && req.body.name.length > 0 && req.body.name.length <= 40) {
//         post.title = req.body.title
//         res.status(204).send()
//     } else {
//         res.status(400).send({
//             "errorsMessages": [
//                 {
//                     "message": "Title is required",
//                     "field": "name"
//                 }
//             ],
//             "resultCode": 1
//         })
//     }
// })
//
//
//
