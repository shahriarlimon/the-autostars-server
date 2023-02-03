const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./db/db')
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 5000;
const apiRoutes = require('./routes/apiRoutes')
/* middle ware */
app.use(cors())
app.use(express.json())

/* connecting to db */
connectDb()


app.get('/', (req, res) => {
    res.send('the autocar is running')
});

app.use('/api/v1', apiRoutes)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

