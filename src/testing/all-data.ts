import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {postsRepository} from "../repositories/posts-repository";


export const bloggersRouter = Router({})
export const postsRouter = Router({})


bloggersRouter.delete('/', (req: Request, res: Response) => {
    const delBloggers = bloggersRepository.deleteAllData()
    res.status(204).send(delBloggers)
})
postsRouter.delete('/', (req: Request, res: Response) => {
    const delPosts = postsRepository.deleteAllData()
    res.status(204).send(delPosts)
})
