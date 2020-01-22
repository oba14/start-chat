import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { setUsers, newUserJoined } from '../../actions/users';
import { disconnect } from '../../actions/user';
import {logoutUser} from '../../actions/authActions'

const Navbar = () => {
  
    const  user  = useSelector(state=> state.user.user)
    const socket = useSelector(state => state.socket.socket)
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
      if (socket && user) {
        socket.on('connected-users', users => {
          dispatch(setUsers(users));
        });
        socket.on('logged-in', user => {
          dispatch(newUserJoined(user));
          socket.emit('all-users');
        });
      }
      return () => {
        socket && socket.off('connected-users');
        socket && socket.off('logged-in');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, user]);

    return (
      <div >
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
          <div >
            <NavLink exact activeClassName="active"
              to="/"
              className=" col s5 black-text">
              Home
            </NavLink>
            { auth.isAuthenticated && (
            <div className='col s5 center black-text'>
              <button type="button" className='btn btn-danger' onClick={() => dispatch(logoutUser())}>
                Logout
              </button>
            </div>
            )}
            {user.username && 
            <NavLink exact activeClassName="active"
              to="/chat"
              className="col s5 center black-text">
              Chat
            </NavLink> 
            }
          </div>
          {user.username && (
          <>
          <div className='col s5 center black-text'>
            <p style={{color:'green'}}>
            Connected as: <span style={{color: 'white'}}>{user.username}</span>
            </p>
          </div>
          <div className='right'>
            <button type="button" className='btn btn-danger' onClick={() => dispatch(disconnect(socket))}>
              Disconnect
            </button>
          </div>
        </>
        )}
        </nav>
      </div>
    );
}

export default Navbar;
