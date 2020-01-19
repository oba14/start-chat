import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Route, Switch} from 'react-router-dom';
// Components
import LandingPage from '../pages/LandingPage';
import Navbar from './Navbar'
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';
import { ToastContainer} from 'react-toastify';

import { setSocket, serverDown, socketConnected } from '../../actions/sockets';

const Navigation = () => {
    
    const dispatch = useDispatch();
    const socket = useSelector(state=> state.socket.socket);

    useEffect(() => {
      dispatch(setSocket())
    }, []);
  
    useEffect(() => {
      socket &&
        socket.on('disconnect', () => {
          dispatch(serverDown(socket))
        });
    }, [socket]);
  

    useEffect(() => {
      socket &&
        socket.on('connect', () => {
          dispatch(socketConnected())
        });
    }, [socket]);

    return (
      <div className='Navigation'>
        <Navbar />
        <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/chat' component={Chat} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  };

export default Navigation;