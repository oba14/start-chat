var app = require('express')();
const morgan = require('morgan');
require('dotenv').config();
var http = require('http').createServer(app);
const cors = require('cors');
const mongoose = require("mongoose");
let bodyParser = require('body-parser');
const passport = require("passport");
var io = require('socket.io')(http);
const logger = require('./logger');
const { setTimer, clearTimer, removeTimer } = require('./timer');
const uri = process.env.ATLAS_URI;
const loginRoutes = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());

// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


/************** mongodb ************************* */



mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database '+ err)}
);
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// TEST THE SERVER
app.get('/', function(req, res){
  res.send('<h1>Server for Chat App</h1>');
});

/**************** ROUTES ********/
app.use('/chatapp', loginRoutes); //LOGIN ROUTES



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
