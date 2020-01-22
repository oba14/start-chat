import { combineReducers } from 'redux'
import errorReducer from "./errorReducer";
import socket from './socket';
import messages from './messages';
import user from './user';
import users from './users';
import auth from './authReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  socket,
  messages,
  user,
  users,
  auth
});

export default rootReducer