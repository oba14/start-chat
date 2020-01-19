// Receive a new message
export const newMessage = msg => dispatch => {
  dispatch({
    type: 'NEW_MESSAGE',
    payload: msg
  });
};

// Send a message
export const sendMessage = (text, user, socket) => dispatch => {
  const message = {
    text,
    user,
    time: Date.now()
  };

  socket.emit('new-message', message);

  dispatch({
    type: 'SEND_MESSAGE',
    payload: message
  });
};
