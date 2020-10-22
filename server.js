const express = require('express');
const path = require('path');
const { Recoverable } = require('repl');
let db = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 8080;

const reservations = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public/index.html');
    return res.sendFile(filePath);
});

app.get('/notes', (req, res) => {
    const filePath = path.join(__dirname, 'public/notes.html');
    return res.sendFile(filePath);
});
app.get('/api/notes', (req, res) => {
    return res.json(db);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    req.body.id = db.length
    db.push(req.body);
    return (res.json(db));
});

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    db = db.filter(note => {
        if (note.id == req.params.id)
        return (false);
        else return (true);
    })
    res.json(db)
})
app.listen(PORT);