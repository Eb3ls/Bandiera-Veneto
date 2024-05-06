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
    res.render('login');  
})

app.get('/signup', async function(req, res){
    res.render('signup');  
})

app.post('/login', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    //GET USER FROM DATABASE AND CHECK IF PASSWORD MATCHES OR IF USER EXISTS
})

app.post('/register', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    //CREATE USER IN DATABASE IF IT DOESN'T EXIST
})


app.listen(8080);