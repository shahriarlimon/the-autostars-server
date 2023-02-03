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

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

/* connecting to db */
connectDb()


app.get('/', (req, res) => {
    res.send('the autocar is running')
});

app.use('/api/v1', apiRoutes)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});