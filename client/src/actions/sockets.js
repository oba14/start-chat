
import openSocket from 'socket.io-client';
import {toast} from 'react-toastify'; 

// Actions
import { newMessage } from './messages';
import { userLeft, inactive, inactiveUser, setUser } from './user';

const url = 'http://localhost:3001';

// Set socket
export const setSocket = () => dispatch => {
  const io = openSocket(url);
  
  dispatch({
    type: 'SET_SOCKET',
    payload: io
  });
};

// Set landing listeners
export const setLandingListeners = socket => dispatch => {
  socket.on('join-chat-success', user => {
    dispatch(setUser(user));
    socket.emit('all-users');
  });
  socket.on('username-taken', msg => {
    toast.error(`Error: ${msg}`);
  });
  socket.on('validation-error', error => {
    toast.error(`Validation Error: ${error}`);
  });
};

// Clear landing listeners
export const clearLandingListeners = socket => dispatch => {
  socket.off('join-chat-success');
  socket.off('username-taken');
  socket.off('validation-error');
};

// Server down
export const serverDown = socket => dispatch => {
  socket.close();
  dispatch({
    type: 'SERVER_DOWN'
  });
  toast.error('Server is down');
  dispatch(setSocket());
};

// Socket connected
export const socketConnected = () => dispatch => {
  toast.success('Connected to server!');
  dispatch({
    type: 'SOCKET_CONNECTED'
  });
};

// Set chat listeners
export const setChatListeners = socket => dispatch => {
  socket.on('chat message', msg => dispatch(newMessage(msg)));
  socket.on('bye', user => {
    socket.emit('all-users');
    if (user) dispatch(userLeft(user.username));
  });
  socket.on('away', msg => {
    dispatch(inactive(msg));
  });
  socket.on('inactive-user', user => {
    socket.emit('all-users');
    dispatch(inactiveUser(user));
  });
};

// Clear chat listeners
export const clearChatListeners = socket => dispatch => {
  socket.off('message');
  socket.off('bye');
  socket.off('away');
  socket.off('inactive-user');
};
