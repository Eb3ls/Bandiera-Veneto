const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
//const _ = require("lodash");
const cors = require('cors')
app.use(cors());
// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files directory
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const mongoDBUri = "mongodb+srv://panecondito10:jQpyqMmPfDOwxUhj@cluster0.l0sw5ha.mongodb.net/TodoList?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDBUri);

const entrySchema = new mongoose.Schema({
    _id: Date,
    data: String,
    completed: Boolean
});

const Entry = mongoose.model("entry", entrySchema);

app.get('/', function(req, res) {
    res.render('pages/home');
});

app.post('/add', async function(req, res) {
    const newEntry = new Entry({
        _id: Date.now(),
        data: req.body.data,
        completed: false
    });
    await newEntry.save();
    res.redirect('/');
});

app.post('/delete', async function(req, res) {
    let id = parseInt(req.body.id);
    if(req.body.id == -1){
        await Entry.deleteMany();
    }else{
        await Entry.deleteOne({ _id: id });
    }
    res.redirect('/');
}); 






//Fine
app.listen(8080);