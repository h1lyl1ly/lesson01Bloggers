import {Request, Response, Router} from "express";


export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    // напписать логику каую-то типа лезу в коллекцию  беру делит мени и  гг
    res.status(204).send()
})

