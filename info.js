const http = require('http');
const express = require('express');
const path = require("path")
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const hostname = '127.0.0.1';
const port = 81;
const app = express();

app.use(express.static(__dirname));//to serve static files like images
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/pk', { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;


var contactSchema = new mongoose.Schema({
    name: String,
    email: { type: String },
    message: String
});

var contactModel = mongoose.model('contact', contactSchema);



var obj =[
    'pubgGlitches',
    'pliteGlitches',
    'codGlitches',
    'freeGlitches'
]
var link =[
    'pubgDownload',
    'pliteDownload',
    'codDownload',
    'freeDownload'
]
for (let i = 0; i < obj.length; i++) {
    app.get(`/${obj[i]}`, (req, res) => {
        res.sendFile(path.join(__dirname, `./Glitches/${obj[i]}.html`))
    });
}

for (let i = 0; i < link.length; i++) {
    
    app.get(`/${link[i]}`, (req, res) => {
        res.sendFile(path.join(__dirname, `./download/${link[i]}.html`))
    });
}


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'GamingInfo.html'))
});
app.get("/news", (req, res) => {
    res.sendFile(path.join(__dirname, 'news.html'))
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'GamingInfo.html'))
});

app.post("/GamingInfo", (req, res) => {

    var contactData = new contactModel({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    contactData.save().then(() => {
        res.send("Response has submitted")

    }).catch(() => {
        res.status(400).send("Something went wrong!")
    });

});


app.listen(port, () => {
    console.log(`The server is running at http://${hostname}:${port}/`);
});