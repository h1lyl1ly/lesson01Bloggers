import {MongoClient} from "mongodb"
import {config} from "dotenv"
config()


export type BloggerType = {
    id: string
    name: string
    youtubeUrl: string
    createdAt: Date
}

export type PostsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: Date
}



const mongoUri = process.env.MONGOURI || "mongodb://localhost:27017"

if (!mongoUri) {
    throw new Error('mongo uri doesnt exist')
}

const client = new MongoClient(mongoUri)

// const client = new MongoClient ("mongodb://localhost:27017")


export const db = client.db("it-incubator")
export const bloggersCollection = db.collection<BloggerType>("blogs")
export const postsCollection = db.collection<PostsType>("posts")

export async function runDb() {
    try {
        await client.connect();
        await client.db("it-incubator").command({ ping: 1 });
        console.log("Connected successfully to server");
    } catch(error) {
        await client.close();
    }
}




