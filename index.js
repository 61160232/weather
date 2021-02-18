const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:ploysiri+3012@cluster0.jgurt.mongodb.net/sample_restaurants?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async (req, res) => {
    try {
        const callLetters = req.query.callLetters
        const db = client.db('Test1')
        const collection = db.collection('data')
        let query = {}
        if (callLetters){
            query.callLetters = callLetters
        }
        // const query = {cuisine: cuisine , borough: borough}
        const cursor = collection.find(query).limit(10)
        let restaurants = []
        await cursor.forEach(doc => restaurants.push(doc.name))

        res.send(restaurants)
    }
    catch(e) {
        console.log(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))