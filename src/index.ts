import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {bloggersRouter} from "./routes/bloggers-router"
import {postsRouter} from "./routes/posts-router"
import {testingRouter} from "./testing/all-data";
import {runDb} from "./repositories/db";
// import {config} from "dotenv"
// config()


const app = express()
const port = process.env.PORT || 3001




app.use(cors())
app.use(bodyParser.json())
app.use('/blogs', bloggersRouter)
app.use('/posts', postsRouter)
app.use('/testing',testingRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

