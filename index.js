const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
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
      const uploadedCarsCollection = client.db("theAutoCars").collection("uploadedCarsCollection");
      app.get('/cars', async(req,res)=>{
         const result = await carsCollection.find({}).toArray();
         res.send(result);
      })
      /* get uploaded car */
      app.get('/uploadedCars',async(req,res)=>{
        const tokenInfo = req.headers.authorization;
        const [email, accessToken] = tokenInfo.split(" ");
        const decoded = verifyToken(accessToken);
        if(email === decoded.email){
          const uploadedCars = await uploadedCarsCollection.find({}).toArray();
          res.send(uploadedCars);
        }else{
            
        }
      })
      /* json webtoken */
      app.post('/login', async(req,res)=>{
        const email = req.body;
        const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRATE);
        res.send({token});
      })
      app.get('/car/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id:ObjectId(id)};
        const result = await carsCollection.findOne(filter);
        res.send(result);
      })
      /* upload car */
      app.post('/car', async(req,res)=>{
        const newCar = req.body;
        const tokenInfo = req.headers.authorization;
        const [email, accessToken] = tokenInfo.split(" ");
        const decoded = verifyToken(accessToken);
        if(email === decoded.email){
          const result = await carsCollection.insertOne(newCar);
          const uploadedCarsResult = await uploadedCarsCollection.insertOne(newCar);
          res.send({success:'Product uploaded successfully!'});
        }else{
            res.send({success: 'Unauthorized Access'})
        }
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
        const uploadCarsResult = await uploadedCarsCollection.deleteOne(filter);
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
function verifyToken(token){
  let email;
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE, function(err, decoded) {
    if(err){
      email = 'Invalid email';
    }else{
      email = decoded;
    }
  });

  return email;
  
}