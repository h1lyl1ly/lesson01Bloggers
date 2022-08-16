import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {bloggersRouter} from "./routes/bloggers-router"
import {postsRouter} from "./routes/posts-router"

const app = express()
const port = process.env.PORT || 3001


// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(cors())
app.use(bodyParser.json())
app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
