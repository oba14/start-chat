import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';


// Actions
import { joinChat } from '../../actions/user';
import { setLandingListeners, clearLandingListeners } from '../../actions/sockets';

const useStyles = makeStyles (theme => ({
    root: {
        padding: theme.spacing(3,2),
        margin: '50px'
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh'
    },
    button: {
        width: '15%',
    }
}))

const LandingPage = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    const [textValue, setTextValue] = useState('');
    
    // state hook
    const  user  = useSelector(state=> state.user.user)
    const socket = useSelector(state => state.socket.socket)
    const auth = useSelector(state => state.auth)

    const ENTER_KEY = 13;

    useEffect(() => {
        
        if (socket)dispatch(setLandingListeners(socket))
        
        return () => {
          if (socket)dispatch(clearLandingListeners(socket))
          
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [socket]);

    useEffect(() => {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        
        if (user.username !== null) {
          props.history.push("/chat");
          toast.success(`${user.username} is signed in!`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [user])


    const handleSubmit = event => {
        if (event.keyCode === ENTER_KEY) {
            sendData();
        }
    };  
    const sendData = () => {
        
        if (socket) {
            if (textValue.length > 0) {
                if (socket.connected) {
                    dispatch(joinChat(socket, textValue, props.history))
                    //setTextValue('')
                } else {
                    toast.warn('Server unavailable');
                }
            }
        }
    };

    if (!auth.isAuthenticated) {
        // return <Redirect to='/' />
        props.history.push("/")
    };
    return (
        
        <div className= {classes.flex}>
            <TextField
                className={classes.chatbox}
                label="Enter User name"
                value={textValue}
                onKeyDown= {handleSubmit}
                onChange= {(e) => setTextValue(e.target.value)}
                />
            <Button variant="contained" 
            color="primary"
            type="submit"
            className={classes.button}
            onClick= {sendData}
            >
                Chat
            </Button>
        </div>
      
    )
}

export default LandingPage;