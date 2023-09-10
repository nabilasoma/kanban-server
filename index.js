const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// kanbanUser
// JX0DeFR0oaCSRlAP






const uri = `mongodb+srv://kanbanUser:JX0DeFR0oaCSRlAP@cluster0.5rfymji.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const usersCollection = client.db("kanbanDB").collection("kanbanUsers");




    app.post('/kanbanUsers', async(req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    });

    app.get('/kanbanUsers', async(req, res) => {
        const cursor = usersCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    });


    app.put('/kanbanUsers/:id', async(req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const options = { upsert: true };
        const updateDoc = req.body;
        const updatedDoc = {
          $set: {
            title: updateDoc.title,
            description: updateDoc.description,
          },
        };
        const result = await usersCollection.updateOne(filter, updatedDoc, options);
        res.send(result);
      });


      app.delete('/kanbanUsers/:id', async(req, res) => {
        const id =  req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('kanban app is running');
});


app.listen(port, () => {
    console.log(`kanban app is running on port: ${port}`);
});