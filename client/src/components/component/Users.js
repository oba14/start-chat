import React from 'react';
import {useSelector} from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// Redux


const Users = ({classes}) => {

  const users = useSelector(state => state.users.users)
  
  return (
    <div className= {classes.topicsWindow}>
      <div style={{color: 'blue'}}>Online Users</div>
            <List>
                {
                    users.map((user, index) => (
                        <ListItem  
                        key={index} button>
                        <ListItemText primary= {user.username} />
                        </ListItem>    
                    ))    
                }
            </List>
    </div>
  );
};


export default Users;
