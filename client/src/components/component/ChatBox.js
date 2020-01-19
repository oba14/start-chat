import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';

// Actions
import { sendMessage } from '../../actions/messages';


const ChatBox = ({classes, user, activeTopic, socket}) => {
    
    const ENTER_KEY = 13;
    const dispatch = useDispatch();

    // local state
    const [textValue, changeTextValue] = useState('');

    const handleSubmit = event => {
        if (event.keyCode === ENTER_KEY) {
            sendChat();
        }
    }; 

    const sendChat = () => {
        dispatch(sendMessage(textValue, user, socket));
        changeTextValue('')
    }

    return (
        <div className= {classes.flex}>
            <TextField
                className={classes.chatBox}
                label="Send a chat"
                value={textValue}
                onKeyDown= {handleSubmit}
                onChange= {(e) => changeTextValue(e.target.value)}
                />
            <Button variant="contained" 
                color="primary"
                className={classes.button}
                onClick= {sendChat}>
                Send
            </Button>

        </div>
    )
}

export default ChatBox;