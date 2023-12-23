const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.SERVER_USER}:${process.env.SERVER_PASSWORD}@cluster0.t9srx14.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const articlesCollection = client.db('journals').collection('articles')
    const editorialBoardsCollection = client.db('journals').collection('editorialBoards')
    const archivesCollection = client.db('journals').collection('archives')


    //get all articles

    app.get('/articles', async (req, res) => {
        const result = await articlesCollection.find().toArray()
        res.send(result)
    })


    //get all editorsBoard

    app.get('/editorialBoards', async (req, res) => {
        const result = await editorialBoardsCollection.find().toArray()
        res.send(result)
    })


    //get all archives

    app.get('/archives', async (req, res) => {
        const result = await archivesCollection.find().toArray()
        res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Mamim side is running')
  })
  
  app.listen(port, () => {
    console.log(` Mamim side is running, ${port}`)
  })