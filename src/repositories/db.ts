import {MongoClient} from "mongodb"


export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
    сreatedAt: Date
}


const mongoUri = "mongodb://127.0.0.1:27017"

const client = new MongoClient(mongoUri)
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