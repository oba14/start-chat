import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

/*
    msg {
        from: 'user'
        msg: 'hi'
        topic: 'general'
    }

    state {
        topic1: [
            {msg}, {msg}, {msg}
        ]

        topic2: [
            {msg}, {msg}, {msg}
        ]
    }
 */

 const initState = {
     general: [
         {from: 'abc', msg:'1'},
         {from: 'def', msg:'2'},
         {from: 'ghi', msg:'3'}
     ],
     topic2: [
        {from: 'jkl', msg:'99'},
        {from: 'mno', msg:'45'},
        {from: 'pqr', msg:'64646'}
    ]

 }
function reducer(state, action) {
    const {msg, from, topic} = action.payload;
    switch(action.type) {
        case 'RECIEVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }
            default:
                return state
    }
}


let socket;

function sendChatAction(value) {
    socket.emit('chat message', value)
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)
    
    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
           dispatch({type:'RECIEVE_MESSAGE', payload: msg})
           ;
          });
    }

    const user = 'aaron' + Math.random(100).toFixed(2);
    

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}