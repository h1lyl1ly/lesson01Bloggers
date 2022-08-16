import {NextFunction, Request, Response, Router} from 'express'
import {body, validationResult} from 'express-validator'


let bloggers = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'it-incubator.eu'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'it-incubator.eu'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'it-incubator.eu'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'it-incubator.eu'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'it-incubator.eu'}
]

export const nameValidationMiddleware = body("name").isString().trim().isLength({min: 0, max: 15})
export const youtubeUrlMiddleware = body("youtubeUrl").isString().trim().isLength({max: 100}).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const resultErrors = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        res.status(400).send(resultErrors)

    } else {
        next()
    }
}

export const bloggersRouter = Router({})


bloggersRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find((blogger) => {
        if (blogger.id === id) return true;
        else return false;
    })
    if (blogger !== undefined) {
        res.status(200).send(blogger)
    } else {
        res.status(404).send()
    }
})
bloggersRouter.post('/',
    inputValidationMiddleware,
    nameValidationMiddleware,
    youtubeUrlMiddleware,
    (req: Request, res: Response) => {
        const newBlogger = {
            id: +(new Date()),
            name: req.body.name,
            youtubeUrl: req.body.youtubeUrl
        }
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    })
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const bloggerIndex = bloggers.findIndex((blogger) => blogger.id === +req.params.id)
    if (bloggerIndex === -1) return res.status(404).send()
    bloggers = bloggers.filter(blogger => blogger.id !== +req.params.id)
    res.status(204).send()
})
bloggersRouter.put('/:id',
    inputValidationMiddleware,
    nameValidationMiddleware,
    youtubeUrlMiddleware,
    (req: Request, res: Response) => {
        const id = +req.params.id
        const blogger = bloggers.find(blogger => blogger.id === id)
        if (!blogger) return res.status(404).send()
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        return res.status(204).send(blogger)
    })



