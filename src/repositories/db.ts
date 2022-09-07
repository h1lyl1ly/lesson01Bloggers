import {MongoClient} from "mongodb"
import {config} from "dotenv"
config()

export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
    createdAt: Date
}




const client = new MongoClient(process.env.MONGOURI || "mongodb+srv://tim:WQDSkgjJJUF5TdOE@learning.upprzye.mongodb.net/Learning?retryWrites=true&w=majority")


export const db = client.db("it-incubator")
export const bloggersCollection = db.collection<BloggerType>("bloggers");

// добавить сюда коллекцию ппостов
// export const postsCollection =



export async function runDb() {
    try {
        await client.connect();
        await client.db("it-incubator").command({ ping: 1 });
        console.log("Connected successfully to server");
    } catch {
        console.log('Connected failed')
        await client.close();
    }
}