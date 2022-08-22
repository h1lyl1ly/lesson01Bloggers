import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {postsRepository} from "../repositories/posts-repository";
//
//
// export const bloggersRouter = Router({})
// export const postsRouter = Router({})
export const testingRouter = Router({})
//
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    bloggersRepository.deleteAllData()
    res.status(204).send()
})
// testingRouter.delete('/all-data', (req: Request, res: Response) => {
//     postsRepository.deleteAllData()
//     res.status(204).send()
// })
