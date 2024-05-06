const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const {MongoClient, ObjectId} = require('mongodb');

path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function(req, res){
    res.render('home');  
})


app.listen(8080);