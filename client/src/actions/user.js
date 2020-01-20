
  import {toast} from 'react-toastify'; 
  
  // Join chat
  export const joinChat = (socket, username) => dispatch => {
    const user = {
      id: socket.id,
      username
    };
  
    socket.emit('join-chat', user);
  };
  
  // Set user
  export const setUser = user => dispatch => {
    dispatch({
      type: 'SET_USER',
      payload: user
    });
  };
  
  // User left chat
  export const userLeft = user => dispatch => {
    dispatch({
      type: 'USER_LEFT',
      payload: {
        user,
        text: 'Left the chat, connection lost',
        left: true,
        time: Date.now()
      }
    });
  };
  
  // Disconnect
  export const disconnect = socket => dispatch => {
    socket.emit('sign-out');
  
    dispatch({
      type: 'DISCONNECT'
    });
  
    toast.success('User Signed out');
  };
  
  // Disconnected due to inavtivity
  export const inactive = msg => dispatch => {
    toast.warn('Disconnected due to inactivity');
  
    dispatch({
      type: 'INACTIVE'
    });
  };
  
  // Inactive user disconnected
  export const inactiveUser = user => dispatch => {
    dispatch({
      type: 'INACTIVE_USER',
      payload: {
        user,
        text: 'User disconnected',
        left: true,
        time: Date.now()
      }
    });
  };
  