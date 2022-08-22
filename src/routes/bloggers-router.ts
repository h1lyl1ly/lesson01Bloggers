import {Request, Response, Router} from 'express'
import {authMiddleware} from "../middlewares/auth-middleware";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {nameValidationMiddleware} from "../middlewares/name-middleware";
import {youtubeUrlMiddleware} from "../middlewares/youtubeUrl-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


// export const testingRouter = Router({})
export const bloggersRouter = Router({})

bloggersRouter.get('/', (req: Request, res: Response) => {
    const foundBloggers = bloggersRepository.allBloggers()
    res.status(200).send(foundBloggers)
})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlogger = bloggersRepository.getBloggerById(+req.params.id)
    if (foundBlogger) {
        res.status(200).send(foundBlogger)
    } else {
        res.status(404).send()
    }
})
bloggersRouter.post('/',
    authMiddleware,
    nameValidationMiddleware,
    youtubeUrlMiddleware,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newBlogger = bloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
    })
bloggersRouter.delete('/:id',
    authMiddleware,
    (req: Request, res: Response) => {
        const isDeleted = bloggersRepository.deleteBlogger(+req.params.id)
        if (isDeleted) {
            res.status(204).send()
        } else {
            res.status(404).send()
        }
    })
bloggersRouter.put('/:id',
    authMiddleware,
    nameValidationMiddleware,
    youtubeUrlMiddleware,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
        if (isUpdated) {
        const blogger = bloggersRepository.getBloggerById(+req.params.id)
            res.status(204).send(blogger)
        } else {
            res.status(404).send()
        }
        // const id = +req.params.id
        // const blogger = bloggers.find(blogger => blogger.id === id)
        // if (!blogger) return res.status(404).send()
        // blogger.name = req.body.name
        // blogger.youtubeUrl = req.body.youtubeUrl
        // return res.status(204).send(blogger)
    })



