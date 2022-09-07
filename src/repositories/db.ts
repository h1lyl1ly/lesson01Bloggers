import {MongoClient} from "mongodb"
import {config} from "dotenv"
config()

export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
    createdAt: Date
}




const client = new MongoClient(process.env.MONGOURI || "")
console.log({client: process.env.MONGOURI})

export const db = client.db("it-incubator")
export const bloggersCollection = db.collection<BloggerType>("bloggers");


export async function runDb() {
    try {
        await client.connect();
        await client.db().command({ ping: 1 });
        console.log("Connected successfully to server");
    } catch {
        console.log('Connected failed')
        await client.close();
    }
}