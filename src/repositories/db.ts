import {MongoClient} from "mongodb"


export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
    сreatedAt: Date
}


const mongoUri = "mongodb://tim:5u6249tqtjt@ac-ez5opmn-shard-00-00.upprzye.mongodb.net:27017,ac-ez5opmn-shard-00-01.upprzye.mongodb.net:27017,ac-ez5opmn-shard-00-02.upprzye.mongodb.net:27017/admin?ssl=true&replicaSet=atlas-sp8ntd-shard-0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=atlas-sp8ntd-shard-0&3t.databases=admin&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true&3t.sslTlsVersion=TLS"





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