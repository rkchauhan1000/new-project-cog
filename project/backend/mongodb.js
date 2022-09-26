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
    data = await data.find().toArray();
    // console.log("------------------------------------------------------------------------------------>")
    // console.log(data);

    // let res_data = [];

    // for(let i=0;i<data.length;i++)
    // {
    //     res_data.push({data[i].price, data[i].discount, data[i].startDate, data[i].endDate});
    // }
    // console.log(typeof(data))
    // localStorage.setItem('data',data)
    return res.send(data)
}); 

app.post('/updateOffers', async (req,res) => {

    let data = await dbConnect();

    let temp_res = await data.deleteMany({});

    // console.log(temp_res);

    // console.log("Response ------------------------> ",req.body);
    // let result = await data.insert(req.body);

    // for(let i = 0 ; i < req.body.length ; i++)
    // {
        
    // }
    let result = await data.insertMany(req.body);
    res.send({
        message : 'Successfully updated data !!'
    })
});

app.listen(3000 ,() => {
    console.log('Server running !!')
})
