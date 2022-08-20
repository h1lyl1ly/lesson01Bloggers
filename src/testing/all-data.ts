import {Request, Response} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {bloggersRouter} from "../routes/bloggers-router";

bloggersRouter.delete('/', (req: Request, res: Response) => {
    const foundBloggers = bloggersRepository.deleteAllData()
    res.status(204).send(foundBloggers)
    })