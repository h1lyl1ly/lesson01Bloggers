import {Request, Response, Router} from "express";
import {bloggersCollection} from "../repositories/db";


export const testingRouter = Router({})

testingRouter.delete('/all-data',  async (req: Request, res: Response) => {
    // const deleteAll = await bloggersCollection.deleteMany({})
    // return deleteAll
    // напписать логику каую-то типа лезу в коллекцию  беру делит мени и  гг
    res.status(204).send()
})

