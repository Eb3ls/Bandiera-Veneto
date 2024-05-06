const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const mongoDBUri = "mongodb+srv://panecondito10:jQpyqMmPfDOwxUhj@cluster0.l0sw5ha.mongodb.net/ToDoListDB";
const client = new MongoClient(mongoDBUri);
client.connect();

const collection = client.db().collection("users");

app.get('/', async function (req, res) {
    //IF SESSION ON REDIRECT TO HOME/USERNAME ELSE REDIRECT TO LOGIN
    res.redirect('/login');
})

app.get('/register', async function (req, res) {
    res.render('register', { error: "" });
})

app.get('/login', async function (req, res) {
    res.render('login', { error: "" });
})

app.post('/adduser', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    //CREATE USER IN DATABASE IF IT DOESN'T EXIST

    //CHECK IF USER EXISTS
    const user = await collection.findOne({ username: username });
    if (user) {
        res.render('register', { error: "User already exists" })
        return;
    }
    let newUser = {
        username: username,
        password: crypto.createHash('md5').update(password).digest('hex'),
        timerData: {
            studyTime: 5,
            sessions: 1,
            breakTime: 5,
            timeElapsed: 0,
            timeStopped: 0
        }
    };
    await collection.insertOne(newUser);
    res.render('home', { timerData: newUser.timerData });
})

app.post('/pomodoro', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    //GET USER FROM DATABASE AND CHECK IF PASSWORD MATCHES OR IF USER EXISTS
    const user = await collection.findOne({ username: username });

    if (!user) {
        res.render('login', { error: "User doesn't exist" })
        return;
    }

    if (user.password !== crypto.createHash('md5').update(password).digest('hex')) {
        res.render('login', { error: "Incorrect password" })
        return;
    }

    res.render('home', { timerData: user.timerData });
})

// app.get('/home/:username', async function (req, res) {
//     const username = req.params.username;
//     const user = await collection.findOne({ username });
//     //CHECK IF USER LOGGED IN USING SESSION
//     res.render('home');

// })



app.listen(8080);