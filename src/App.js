import React, {useState} from 'react';
import './App.css';
import ChatList from './components/chatList/ChatList';
import ChatBody from './components/chatBody/ChatBody';


function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  return (
    <div className="App">
        <ChatList setData={setData} message={message} />
        <ChatBody data={data} setMessage={setMessage} />
    </div>
  );
}

export default App;
