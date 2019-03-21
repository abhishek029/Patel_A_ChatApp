// set express
const express = require('express');
const app = express();
const io = require('socket.io')();

// config port
const port = process.env.PORT || 3000;

// tell app to use public folder
app.use(express.static('public'));

// instansitate route

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

// create server variable

const server = app.listen(port, () => {
    console.log(`app is runing on port ${port}`);
})