var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('index.html')
})

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('chat message', (msg,username) => {
        io.emit('chat message',msg,username);
    });
});

http.listen(3000, () => {
    console.log('listen server on port 3000')
})