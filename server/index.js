var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const logger = require('./logger');
const { setTimer, clearTimer, removeTimer } = require('./timer');

// TEST THE SERVER
app.get('/', function(req, res){
  res.send('<h1>Server for Chat App</h1>');
});

const timeout = 120000; // logout user after given time

// START A NEW CONNECTION
io.on('connection', (socket) => {

  logger.info(`New connection: ${socket.id}`);

  // Join A CHAT SESSION
  socket.on('join-chat', user => {
    const users = getUsers(io);
    if (users.find(e => e.username === user.username)) {
      socket.emit(
        'username-taken',
      `Username ${user.username} is already taken`
      );
      logger.error(
        `${socket.id} Username already taken - ${user.username}`
      );
    } else if (/^\w+$/i.test(user.username)) {
      socket.user = user;
      socket.emit('join-chat-success', user);
      socket.broadcast.emit('logged-in', user);
      logger.info(
        `${socket.id} joined chat with username - ${user.username}`
      );
      setTimer(socket, timeout);
    } else {
      logger.error(`${socket.id} tried to join chat with invalid username`);
      socket.emit(
        'validation-error',
        'Username Invalid (only numbers and lettes allowed)'
      );
    }
  });

  // Get ALL THE CONNECTED USERS
  socket.on('all-users', () => {
    const users = getUsers(io);
    socket.emit('connected-users', users);
  });

  // SEND MESSAGE
  socket.on('new-message', msg => {
    if (msg.user === socket.user.username) {
      clearTimer(socket, timeout);
      logger.info(`${socket.user.username}'s timer has been reset`);
    }
    socket.broadcast.emit('chat message', msg);
    logger.info(
      `${socket.user.username} with ID ${socket.id} sent a new message - ${msg.text}`
    );
  });

  // LEAVE CHAT SESSION
  socket.on('sign-out', () => {
    socket.broadcast.emit('bye', socket.user);
    removeTimer(socket);
    logger.info(
      `${socket.user.username} with ID ${socket.id} just left the chat`
    );
    delete socket.user;
  });

});

// GET THE USERS
const getUsers = io =>
  Object.keys(io.sockets.sockets)
  .map(id => io.sockets.sockets[id].user)
  .filter(s => s);

process.on('SIGINT', () => {
  io.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  io.close();
  process.exit(0);
});

// Server listening on given port
http.listen(3001, () => {
  console.log('listening on *:3001');
});
