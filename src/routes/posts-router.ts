import {Request, Response, Router, NextFunction} from 'express'
import {authMiddleware} from "../middlewares/auth-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {titleValidation} from "../middlewares/title-middleware";
import {shortDescriptionValidation} from "../middlewares/shortDescription";
import {contentValidation} from "../middlewares/content";
import {bloggerIdValidation} from "../middlewares/bloggerId";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";
import {CustomValidation} from "express-validator/src/context-items";






export const postsRouter = Router({})
export const testingRouter = Router({})



postsRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.allPosts()
    res.status(200).send(foundPosts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const foundPost = postsRepository.getPostsById(+req.params.id)
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send()
    }
})
postsRouter.post('/',
    authMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (!newPost) return res.status(400).send({errorsMessages: [{ message: 'Invalid bloggerId', field: "bloggerId" }] })
       res.status(201).send(newPost)
    })
postsRouter.delete('/:id',
    authMiddleware,
    (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePost(+req.params.id)
        if (isDeleted) {
            res.status(204).send()
        } else {
            res.status(404).send()
        }
})
postsRouter.put('/:id',
    authMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = postsRepository.updatePost(+req.params.id,req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (isUpdated) {
            const post = postsRepository.getPostsById(+req.params.id)
            res.status(204).send(post)
        } else {
            res.status(404).send()
        }
    })





