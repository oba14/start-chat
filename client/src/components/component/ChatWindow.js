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
                <div key={index}>
                        <div className={`${classes.flex} ${user === msg.user ? 'user' : 'ext'}`} key={index}>
                            <Chip
                                label={msg.user}
                                className={classes.chip}
                                />
                            <Typography 
                                variant='body1' 
                                gutterBottom
                                > { msg.text } </Typography>
                        </div>
                        <div className='time' style={{fontSize:'60%'}}>
                            <Moment fromNow>{msg.time}</Moment>
                        </div>
                </div>
            ))}
        </div>   
    )
}

export default ChatWindow;