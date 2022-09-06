import {Request, Response, Router} from 'express'
import {authMiddleware} from "../middlewares/auth-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {postsRepository, PostsType} from "../repositories/posts-in-memory-repository";
import {postsValidation} from "../middlewares/posts-midlewares";


export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response) => {
    const foundPosts: PostsType[] = await postsRepository.allPosts()
    res.status(200).send(foundPosts)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost = await postsRepository.getPostsById(+req.params.id)
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send()
    }
})
postsRouter.post('/',
    authMiddleware,
    postsValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPost = await postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (!newPost) return res.status(400).send({
            errorsMessages: [{
                message: 'Invalid bloggerId',
                field: "bloggerId"
            }]
        })
        res.status(201).send(newPost)
})
postsRouter.delete('/:id',
    authMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsRepository.deletePost(+req.params.id)
        if (isDeleted) {
            res.status(204).send()
        } else {
            res.status(404).send()
        }
})
postsRouter.put('/:id',
    authMiddleware,
    postsValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (isUpdated) {
            const post = await postsRepository.getPostsById(+req.params.id)
            res.status(204).send(post)
        } else {
            res.status(404).send()
        }
})





