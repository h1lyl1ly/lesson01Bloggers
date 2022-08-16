import {Request, Response, Router, NextFunction} from 'express'
import {body, validationResult} from 'express-validator'

let posts = [
    {
        id: 1,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 9,
        bloggerName: 'Timur'
    },
    {
        id: 2,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 10,
        bloggerName: 'Timur'
    },
    {
        id: 3,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 11,
        bloggerName: 'Timur'
    },
    {
        id: 4,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 12,
        bloggerName: 'Timur'
    },
    {
        id: 5,
        title: 'About JS - 01',
        shortDescription: 'it-incubator.eu',
        content: 'privet',
        bloggerId: 13,
        bloggerName: 'Timur'
    },
]

export const postsRouter = Router({})

export const titleValidation = body('title').isString().trim().isLength({max: 30})
export const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({max: 100})
export const contentValidation = body('content').isString().trim().isLength({max: 1000})
export const bloggerIdValidation = body().isNumeric()
export const bloggerNameValidation = body('bloggerName').isString().trim().isLength({min: 3, max: 15})
export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        res.status(400).send({errorMessages})
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
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    bloggerNameValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newPost = {
            id: +(new Date()),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: +(new Date()),
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
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    bloggerNameValidation,
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
        post.bloggerId = req.body.bloggerId
        return res.status(204).send(post)
    })

//   get запрос по конкретной айди как сделать ошибку 400 ?
//   post, почему-то генериться одинаковый id и bloggerid - они веедь ддолжны быть разные?
//   put, не получается обновить данные


