import {MongoClient} from "mongodb"
import {config} from "dotenv"
config()

const mongoUri = process.env.MONGOURI || "mongodb://localhost:27017/?maxPoolSize=20&w=majority" || "mongodb+srv://tima:srQknCjEun3iGtnD@cluster0.lzwzkeo.mongodb.net/Cluster0?retryWrites=true&w=majority"

const client = new MongoClient(mongoUri)

// const client = new MongoClient ("mongodb://localhost:27017")



export const db = client.db("it-incubator")
export const bloggersCollection = db.collection<BloggerType>("bloggers")
export const postsCollection = db.collection<PostsType>("posts")

export async function runDb() {
    try {
        await client.connect();
        await client.db("it-incubator").command({ ping: 1 });
        console.log("Connected successfully to server");
    } catch {
        console.log('Connected failed')
        // await client.close();
    }
}

export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
    createdAt: Date
}

export type PostsType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
    createdAt: Date
}


