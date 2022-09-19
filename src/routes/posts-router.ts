import {Request, Response, Router} from 'express'
import {authMiddleware} from "../middlewares/auth-middleware";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {postsValidation} from "../middlewares/posts-midlewares";
import {postsService} from "../domain/posts-service";
import {PostsType} from "../repositories/db";
import {bloggersService} from "../domain/bloggers-service";

export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response) => {
    const foundPosts: PostsType[] = await postsService.allPosts()
    res.status(200).send(foundPosts)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost = await postsService.getPostsById(req.params.id)
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send()
    }
})
postsRouter.post('/',
    authMiddleware,
    postsValidation,
    errorsValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogger = await bloggersService.getBloggerById(req.body.blogId)
        if(blogger){
            const newPost: PostsType | null = await postsService.createPost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, blogger)
            if (!newPost) return res.status(400).send({
                errorsMessages: [{
                    message: 'Invalid blogId',
                    field: "blogId"
                }]
            })
            return res.status(201).send(newPost)
        }
        res.sendStatus(400)


})
postsRouter.delete('/:id',
    authMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsService.deletePost(req.params.id)
        if (isDeleted) {
            res.status(204).send()
        } else {
            res.status(404).send()
        }
})
postsRouter.put('/:id',
    authMiddleware,
    postsValidation,
    errorsValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        console.log(isUpdated,'111')
        if (isUpdated) {
            const post = await postsService.getPostsById(req.params.id)
            res.status(204).send(post)
        } else {
            res.status(404).send()
        }
})





