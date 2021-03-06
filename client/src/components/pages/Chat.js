import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom';

// Components
import ChatWindow from '../component/ChatWindow'
import ChatBox from '../component/ChatBox'
//import TopicsWindow from '../component/TopicsWindow'

// Actions
import { setChatListeners, clearChatListeners } from '../../actions/sockets';
import Users from '../component/Users'

const useStyles = makeStyles (theme => ({
    root: {
        padding: theme.spacing(3,2),
        margin: '50px',
        background: ''
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '20%',
        height: '300px',
        borderRight: '1px solid green'
    },
    chatWindow: {
        width: '100%',
        height: '300px',
        padding: '20px',
        overflow: 'scroll',
        scrollbarWidth: '0px',
        overflowX: 'hidden'

    },
    chatBox: {
        width: '75%',
        marginLeft: '15%'
    },
    button: {
        width: '15%',
    }
}))

const Chat = (props) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const  user  = useSelector(state=> state.user.user.username)
    const messages  = useSelector(state=> state.messages.messages)
    const socket  = useSelector(state=> state.socket.socket)
    
    // Socket listeners
    useEffect(() => {
        if (socket) dispatch(setChatListeners(socket));
        return () => {
        if (socket) dispatch(clearChatListeners(socket));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    useEffect(() => {
        if (messages.length > 0) {
        const msgList = document.querySelector('.chat-window');
        msgList.scrollTop = msgList.scrollHeight;
        }
    }, [messages]);
    
if (!user) {
    // return <Redirect to='/' />
    props.history.push("/")
};
    
    return (
        <div>
            <Paper className= {classes.root}>
                <Typography variant= 'h4' component='h4'> 
                    Chat App
                </Typography >

                <div className= {classes.flex}>
                    
                    <Users classes={classes} />
                    
                    <ChatWindow classes={classes} 
                                messages={messages}
                                user={user} />
                </div>

                <ChatBox classes={classes} 
                         user={ user } 
                         socket={socket}/> 
            </Paper>
        </div>
    )
}

export default Chat;