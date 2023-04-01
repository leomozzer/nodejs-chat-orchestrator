import React, {useEffect, useState} from 'react'
import './App.css';
import {io} from 'socket.io-client'
const socket = io.connect('http://localhost:3500/rooms', {
  transports: ['websocket']
});

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [room, setRoom] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('newMessage', {
      text: message,
      origin: 'chat',
      id: id,
      room: room
    });
    setMessage('');
  }

  socket.on('connected', (socket) => {
    console.log(socket)
    setId(socket.id)
    setRoom(socket.room)
  })

  socket.on('New Message', (socket) => {
    if(socket.id !== id){
      console.log(socket)
    }
  })

  socket.on('response', (socket) => {
    console.log(socket)
  })
  return (
    <div className="App">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
}

export default App;
