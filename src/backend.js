const express = require('express');
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8000;
const database = fs.readFileSync(path.dirname(__dirname) + '/database', 'utf8', (err,data) => { return data })

app.get('/',(req,res) => {
    res.send('Welcome to the Photo-Tag API');
})

// return coordinates on request
app.get('/data',(req,res) => {
    res.header('Access-Control-Allow-Origin', '*');
    // get coordinates from database
    MongoClient.connect(database, (err,client) => {
        if (err) throw err;

        let db = client.db('photo-tag');

        db.collection('coordinates').find({}).toArray((err, result) => {
            if (err) throw err;

            res.json(result);
            
            client.close();

        })
    })

})

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
