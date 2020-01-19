import React from 'react'
import {
    Typography
} from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';
import './Chat.css'


const ChatWindow = ({classes, messages, user}) => {
    
    return ( 
        
        <div className= {`${classes.chatWindow} chat-window`}>   
            {messages.map((msg, index) => (
                <div key={index} className={`${msg.left ? 'left' : ''} ${msg.joined ? 'joined' : ''}`}>
                    <div className={`msg ${user === msg.user ? 'user' : 'ext'}`}>
                        <div className={classes.flex} key={index}>
                            <Chip
                                label={msg.user}
                                className={`${classes.chip} ${user === msg.user ? '' : 'user'}`}
                                />
                            <Typography 
                                variant='body1' 
                                gutterBottom
                                > { msg.text } </Typography>
                        </div>
                        <div className='time'>
                        <   Moment fromNow>{msg.time}</Moment>
                        </div>
                    </div>
                </div>
            ))}
        </div>   
    )
}

export default ChatWindow;