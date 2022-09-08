import {Request, Response, Router} from 'express'
import {authMiddleware} from "../middlewares/auth-middleware";
import {bloggersService} from "../domain/bloggers-service";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {bloggersValidation} from "../middlewares/bloggers-midlewares";
import {BloggerType} from "../repositories/db";

export const bloggersRouter = Router({})

bloggersRouter.get('/', async (req: Request, res: Response) => {
    const foundBloggers = await bloggersService.allBloggers()
    res.status(200).send(foundBloggers)
})
bloggersRouter.get('/:id', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.getBloggerById(+req.params.id)
    if (foundBlogger) {
        res.status(200).send(foundBlogger)
    } else {
        res.status(404).send()
    }
})
bloggersRouter.post('/',
    authMiddleware,
    bloggersValidation,
    errorsValidationMiddleware,
    async (req: Request, res: Response) => {
        const newBlogger: BloggerType = await bloggersService.createBlogger(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
})
bloggersRouter.delete('/:id',
    authMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await bloggersService.deleteBlogger(+req.params.id)
        if (isDeleted) {
            res.status(204).send()
        } else {
            res.status(404).send()
        }
})
bloggersRouter.put('/:id',
    authMiddleware,
    bloggersValidation,
    errorsValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await bloggersService.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
        if (isUpdated) {
            const blogger = await bloggersService.getBloggerById(+req.params.id)
            res.status(204).send(blogger)
        } else {
            res.status(404).send()
        }
})


