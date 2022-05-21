import {Request, Response, Router} from "express";
import {body} from "express-validator";

let bloggers = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'it-incubator.eu'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'it-incubator.eu'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'it-incubator.eu'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'it-incubator.eu'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'it-incubator.eu'}
]


export const bloggersRouter = Router({})



bloggersRouter.get('/', (req: Request, res: Response ) => {
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
bloggersRouter.post('/', (req: Request, res: Response) => {
    const newBlogger = {
        id: +(new Date()),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }

    if (typeof req.body.name === "string" && req.body.name.length > 0 && req.body.name.length <= 15 && req.body.youtubeUrl === "string") {
        res.status(201).send(newBlogger)
        bloggers.push(newBlogger)
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "Title is required",
                    "field": "name"
                }
            ],
            "resultCode": 1
        })
    }
})
bloggersRouter.delete('/:id',(req: Request, res: Response)=> {
    const bloggerIndex = bloggers.findIndex((blogger) => blogger.id === +req.params.id)
    if(bloggerIndex === -1) return res.status(404).send()
    bloggers = bloggers.filter(blogger => blogger.id !== +req.params.id)
    console.log(bloggerIndex)
    res.status(204).send()
})
bloggersRouter.put('/:id',(req: Request, res: Response)=>{
    const id = +req.params.id
    const blogger = bloggers.find((blogger) => {
        if (blogger.id === id) return true;
        else return false;
    })
    if (!blogger) {
        res.status(404).send()
    }
    if (blogger && typeof req.body.name === "string" && req.body.name.length > 0 && req.body.name.length <= 40 && req.body.youtubeUrl === "string" ) {
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        res.status(204).send()
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "Title is required",
                    "field": "name"
                }
            ],
            "resultCode": 1
        })
    }
})