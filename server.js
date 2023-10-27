// import express module to our server
const express = require('express');
// import require("./db/db.json")
const uuid = require('./helpers/uuid')
const db = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const port = 3001;
// create app variable pointing to new express object(express())
const app = express();
// app.use(*middleware*){
// -json, urlencoded, staticify(public)}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// 
// get/delete/post requests:
// 
// get request to send index.html, route: '/'
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// get request to send notes.html, route: '/notes'
//
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// get request to fetch our api to send notes from db.json, route: '/api/notes'
app.get('/api/notes',(req, res)=>{
// console.log(db)
//   console.log(req);
//   console.log(res);
// return res.json;
res.json(db);
});
// post request to fetch our api to modify with parsed req.body data and push post to db.json with fs.writeFile, route: '/api/notes', return res.json;
app.post('/api/notes', (req, res) => {
    // console.log(req.body)
    // newDB.push(req.body);
    // console.log(newDB);
    const { title, text, id } = req.body;
      
    const newNote = {
        title,
        text,
        id: uuid(),
    };

    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db) , (err) => {
    err ? console.error(err) : console.log('note logged')
    // res.json(db);
    });

    res.json(db);
});
// delete request to delete specific note, *EXTRA CRED* remove specific data from db.json and push with fs.writeFile,  route: '/api/notes/:notes_id', return res.json;
// app.delete('/api/notes/:note_id', (req, res) =>{
//     // console.log(req);
//     // console.log(res);
//     // return res.json;
// });
// app.listen
app.listen(port, () =>
console.log(`App listening at http://localhost:${port}`));


// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
// WHEN I click on the Save button
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
// WHEN I click on the "New Note" button in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears