const express = require('express');

const uuid = require('./helpers/uuid')
const db = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes',(req, res)=>{
res.json(db);
});

app.post('/api/notes', (req, res) => {
    const { title, text, id } = req.body;
      
    const newNote = {
        title,
        text,
        id: uuid(),
    };

    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db) , (err) => {
    err ? console.error(err) : console.log('note logged')
    });

    res.json(db);
});
// delete request to delete specific note, *EXTRA CRED* remove specific data from db.json and push with fs.writeFile,  route: '/api/notes/:notes_id', return res.json;
// app.delete('/api/notes/:note_id', (req, res) =>{
//     // console.log(req);
//     // console.log(res);
//     // return res.json;
// });
app.listen(port, () =>
console.log(`App listening at http://localhost:${port}`));
