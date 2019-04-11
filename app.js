// set express
const express = require('express');
const app = express();
const io = require('socket.io')();
let users = 0;
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

//plug in  chat app package
io.attach(server);

io.on('connection', function(socket){
    console.log('a user has connected');
    
    users++;
    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'} );
    io.emit('userCount', {numUsers: users});
    // listen for incoming message
    socket.on('chat message', function(msg){
        // check the message
        console.log('message', msg, 'socket', socket.id);

        // send a message to every connected client
        io.emit('chat message', { id: `${socket.id}`, message: msg });
    });
    
    socket.on('disconnect', function(){
        console.log('a user has disconnected');
        users--;
        io.emit('leftUser', {numUsers: users});
    });

    socket.on('typing', function(){
        console.log('a user has disconnected');
        
        io.emit('userTyping');
    });
});