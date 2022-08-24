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
        // if (!post) return res.status(400).send({errorsMessages: [{ message: 'Invalid bloggerId', field: "bloggerId" }] })
        const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (newPost === false) return res.status(400).send({errorsMessages: [{ message: 'Invalid bloggerId', field: "bloggerId" }] })
        // if (!newPost) return res.status(400).send({errorsMessages: [{ message: 'Invalid bloggerId', field: "bloggerId" }] })
        // if (!newPost) return res.status(400).send({
        //     "errorsMessages": [
        //         {
        //             "message": 'Invalid bloggerId',
        //             "field": "bloggerId"
        //         }
        //     ]
        // })
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
    //idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    //bloggerNameValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = postsRepository.updatePost(+req.params.id,req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (isUpdated) {
            const post = postsRepository.getPostsById(+req.params.id)
            res.status(204).send(post)
        } else {
            res.status(404).send()
        }
        // // const id = +req.params.id
        // // let bloggersId = req.body.bloggerId
        // const blogger = bloggers.find(blogger => blogger.id === bloggersId)
        // if (!blogger) return res.status(400).send({errorsMessages: [{ message: 'Invalid bloggerId', field: "bloggerId" }] })
        // const post = posts.find(post => post.id === id)
        // if (!post) return res.status(404).send()
        // return res.status(204).send(post)
    })




//   get запрос по конкретной айди как сделать ошибку 400 ?
//   post, почему-то генериться одинаковый id и bloggerid - они веедь ддолжны быть разные?
//   put, не получается обновить данные
//   как сделать newpost для конкреетного блогера?


//export const idValidation = body('id').isNumeric().notEmpty()
//export const bloggerNameValidation = body('bloggerName').isString().trim().notEmpty()
