import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {postsRepository} from "../repositories/posts-repository";


export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    res.status(204).send()
})

