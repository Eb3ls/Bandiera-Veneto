const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const path = require('path');
//const _ = require("lodash");
const cors = require('cors');
const { list } = require("tar");
app.use(cors());
// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files directory
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const mongoDBUri = "mongodb+srv://panecondito10:jQpyqMmPfDOwxUhj@cluster0.l0sw5ha.mongodb.net/ToDoListDB";
const client = new MongoClient(mongoDBUri);
client.connect();
// Creation of a collection (a "table" named "events") in the database "ToDoListDB"
const collection = client.db().collection("events");

app.get('/', async function(req, res) {
    const events = await collection.find({}).toArray();
    res.render('pages/home', { listItems: events });
});

app.post('/add', async function(req, res) {
    const newListItem = {
        data: req.body.data,
        completed: false,
        entries: []
    };

    await collection.insertOne(newListItem);
    res.redirect('/');
});

app.post('/delete', async function(req, res) {
    let id = new ObjectId(req.body.id);
    await collection.deleteOne({ _id: id });

    res.redirect('/');
}); 

app.post('/deleteAll', async function(req, res) {
    await collection.deleteMany({});
    res.redirect('/');
});

app.post('/complete', async function(req, res) {
    let id = new ObjectId(req.body.id);
    let completed = req.body.completed === "true" ? false : true;
    await collection.updateOne({ _id: id }, { $set: { completed: completed } });
    res.redirect('/');
});

/*
PAGINA EVENTO
*/

app.get('/event/:id', async function(req, res) {
    const id = new ObjectId(req.params.id);
    const event = await collection.findOne({ _id: id });
    const entries = event.entries;
    res.render('pages/event', { entries: entries, listItem: event });
});

app.post('/event/add/:id', async function(req, res) {
    const id = new ObjectId(req.params.id);
    const entry = {
        _id: new ObjectId(),
        data: req.body.data,
        completed: false
    };
    await collection.updateOne({ _id: id }, { $push: { entries: entry } });

    res.redirect('/event/' + req.params.id);
});


app.post('/event/delete/:id', async function(req, res) {

    const eventId = new ObjectId(req.params.id);
    const entryId = new ObjectId(req.body.id);

    await collection.updateOne({ _id: eventId }, { $pull: { entries: { _id: entryId } } });

    res.redirect('/event/' + eventId);
}); 

app.post('/event/deleteAll/:id', async function(req, res) {
    const eventId = new ObjectId(req.params.id);
    await collection.updateOne({ _id: eventId }, { $set: { entries: [] } });
    res.redirect('/event/' + eventId);  
});


app.post('/event/complete/:id', async function(req, res) {
    const eventId = new ObjectId(req.params.id);
    const entryId = new ObjectId(req.body.id);
    //change completed in the entry inside the event
    let completed = req.body.completed === "true" ? false : true;
    await collection.updateOne({ _id: eventId, "entries._id": entryId }, { $set: { "entries.$.completed": completed } });
    res.redirect('/event/' + eventId);
});


//Fine
app.listen(8080);