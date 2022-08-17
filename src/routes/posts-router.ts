import {Request, Response, Router, NextFunction} from 'express'
import {body, validationResult} from 'express-validator'

let posts = [
    {
        id: 1,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 2,
        bloggerName: 'Timur'
    },
    {
        id: 2,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 3,
        bloggerName: 'Timur'
    },
    {
        id: 3,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 4,
        bloggerName: 'Timur'
    },
    {
        id: 4,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 5,
        bloggerName: 'Timur'
    },
    {
        id: 5,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 6,
        bloggerName: 'Timur'
    },
]

export const postsRouter = Router({})

export const titleValidation = body('title').isString().trim().notEmpty().isLength({min:1, max: 30})
export const shortDescriptionValidation = body('shortDescription').isString().trim().notEmpty().isLength({min:3, max: 100})
export const contentValidation = body('content').isString().trim().notEmpty().isLength({min:1, max: 1000})
export const bloggerIdValidation = body('bloggerId').isNumeric().notEmpty()
//export const idValidation = body('id').isNumeric().notEmpty()
//export const bloggerNameValidation = body('bloggerName').isString().trim().notEmpty()
export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const resultErrors = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        res.status(400).send({errorsMessages: resultErrors})

    } else {
        next()
    }
}

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = posts.find((post) => {
        if (post.id === id) return true;
        else return false;
    })
    if (post !== undefined) {
        res.status(200).send(post)
    } else {
        res.status(404).send()
    }
})
postsRouter.post('/',
    //idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    //bloggerNameValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newPost = {
            id: +req.body.id,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: +req.body.bloggerId,
            bloggerName: req.body.bloggerName
        }
        posts.push(newPost)
        res.status(201).send(newPost)
    })
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const postIndex = posts.findIndex((post) => post.id === +req.params.id)
    if (postIndex === -1) return res.status(404).send()
    posts = posts.filter(post => post.id !== +req.params.id)
    res.status(204).send()
})
postsRouter.put('/:id',
    //idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
   // bloggerNameValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const id = +req.params.id
        // const bloggerId = +req.params.bloggerId
        const post = posts.find(post => post.id === id)
        if (!post) return res.status(404).send()
        post.title = req.body.title
        post.shortDescription = req.body.shortDescription
        post.content = req.body.content
        post.bloggerName = req.body.bloggerName
        post.bloggerId = +req.body.bloggerId
        return res.status(204).send(post)
    })

//   get запрос по конкретной айди как сделать ошибку 400 ?
//   post, почему-то генериться одинаковый id и bloggerid - они веедь ддолжны быть разные?
//   put, не получается обновить данные
//   как сделать newpost для конкреетного блогера?


