const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
          /* link: http://localhost:5000/cars */
         const result = await carsCollection.find({}).toArray();
         res.send(result);
      })
      app.get('/car/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id:ObjectId(id)};
        const result = await carsCollection.findOne(filter);
        res.send(result);
      })
      app.post('/car', async(req,res)=>{
        const newCar = req.body;
        const result = await carsCollection.insertOne(newCar);
        res.send(result);
      })
      app.put('/car/:id', async(req,res)=>{
        const id = req.params.id;
        const newQuantity = req.body.newQuantity;
        console.log(newQuantity);

        const filter = {_id:ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            quantity:newQuantity
          },
        };
        const result = await carsCollection.updateOne(filter, updateDoc, options);
         res.send(result)

      })

      app.delete('/car/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id:ObjectId(id)};
        const result = await carsCollection.deleteOne(filter);
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