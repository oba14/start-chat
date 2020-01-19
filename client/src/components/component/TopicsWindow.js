import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const TopicsWindow = ({topics, setActiveTopic, classes}) => {
    
    
    return (
        <div className= {classes.topicsWindow}>
            <List>
                {
                    topics.map(topic => (
                        <ListItem  
                        onClick= {e => setActiveTopic(e.target.innerText)}
                        key={topic} button>

                        <ListItemText primary= {topic} />
                        </ListItem>
                    
                    ))    
                }
            
            </List>
        </div>
    )
}

export default TopicsWindow;