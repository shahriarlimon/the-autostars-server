const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
/* middle ware */
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.spq3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const carsCollection = client.db("theAutoCars").collection("carsCollection");
      app.get('/cars', async(req,res)=>{
        const result = await carsCollection.find({}).toArray();
        res.send(result);
      })
      
    } finally {
      
    }
  }
  run().catch(console.dir);




app.get('/', (req,res)=>{
 res.send('the autocar is running')
});
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})