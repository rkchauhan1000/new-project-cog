const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017'
const database  = 'cognizant'
const client = new MongoClient(url);
const express = require('express');
const app = express();
async function dbConnect()
{
    let result = await client.connect();
    let db = result.db(database)

    return db.collection('offers');
}

app.use(express.json())

app.get('/getOffers', async (req,res) => {

    let data = await dbConnect();

    let result = await data.find().toArray();
   
    return res.json(result);
}); 

app.post('/updateOffers', async (req,res) => {

    let data = await dbConnect();

    let temp_res = await data.deleteMany({});

    let result = await data.insertMany(req.body);

    res.send({
        message : 'Successfully updated data !!'
    })
});

app.listen(3000 ,() => {
    console.log('Server running !!')
})
