

// Set users
export const setUsers = users => dispatch => {
  dispatch({
    type: 'SET_USERS',
    payload: users
  });
};

// Add new user
export const newUserJoined = user => dispatch => {
  dispatch({
    type: 'NEW_USER_JOINED',
    payload: {
      user: user.username,
      text: 'Just joined the chat',
      joined: true,
      time: Date.now()
    }
  });
};
