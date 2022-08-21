import React, {useState, useEffect, useRef} from 'react';
import './chatBody.css';
import {CgCheckO} from 'react-icons/cg'
import {GiPaperPlane} from 'react-icons/gi'
// import { AliceM, MickleM, KatyM } from './Chats';

const ChatBody = ({data, setMessage}) => {
    const messages = [
        {
            text: 'Hi, Alex!',
            id: 1,
            written: '',
            date: '7/20/22, 03:10 PM',
        },
        {
            text: 'Hi, Alice!',
            id: 2,
            written: 'me',
            date: '7/20/22, 03:13 PM',
        },
        {
            text: 'Are you free this weekend?',
            id: 3,
            written: '',
            date: '7/20/22, 03:15 PM',
        },
        {
            text: ' I think so, why?',
            id: 4,
            written: 'me',
            date: '7/20/22, 03:16 PM',
        },
        {
            text: 'Want to see a movie?',
            id: 5,
            written: '',
            date: '7/20/22, 03:20 PM',
        },
        {
            text: 'Sure)',
            id: 6,
            written: 'me',
            date: '7/20/22, 03:22 PM',
        },
        {
            text: 'I’m glad we will meet up!',
            id: 7,
            written: '',
            date: '7/20/22, 03:29 PM',
        },
    ]
   
    const [textMessages, setTextMessages] = useState([...messages]);
    const [textValue, setTextValue] = useState('');
    const messagesEndRef = useRef()

    // Отримуємо з локального сховища історію переписки
    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('messages'))
        if (savedMessages !== null) {
            setTextMessages(savedMessages)
        }
    }, [textValue]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    // Задаю формат дати і години для ChatBody
    const date = new Date();
    const nowTime = date.toLocaleTimeString('en-US', {year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    
    const sendMessage = () => {

        if (textValue != "") {
            textMessages.push({
                text: textValue,
                id: textMessages.length + 2,
                written: 'me',
                date: nowTime,
            })
            // Зберігаєм до локального сховища всю історію переписки
            scrollToBottom();
            localStorage.setItem('messages', JSON.stringify(textMessages))
            setTextValue("");
        }
        setTimeout(async () => {
            const response = await fetch('https://api.chucknorris.io/jokes/random')
            const data = await response.json()
            const joke = data.value
            console.log(joke);
            textMessages.push({
                text: joke,
                id: textMessages.length + 2,
                written: '',
                date: nowTime,
            })
            
            setTextValue('');
            localStorage.setItem('messages', JSON.stringify(textMessages))
            scrollToBottom(); 
        }, 3000);
        // clearTimeout();
    };

  return (
    <div className="main__chatcontent">
        {data.map(person => {
        if(person.selected == true) {
        return (
        <div key={person.id}>
            <div className="content__header">
                <div className='photo-profile'>
                    <img className='person-photo' src={person.image} alt="My Photo" />
                    <CgCheckO className='online'/>
                </div>
                <h3>{person.name}</h3>
            </div>
            <div className="content__body">
                {textMessages.map(item => {
                    if (item.written === 'me'){
                        return (
                            <div key={item.id} className="chat-item-container chat-item-right">
                                <div className="chat__item_content">
                                    <div className="chat__msg right" onChange={setMessage(item.text)}>{item.text}</div>
                                    <div className="chat__meta">
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                                <div ref={messagesEndRef}></div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={item.id} className="chat-item-container chat-item-left">
                                <div>
                                    <img className='person-photo' src={person.image} alt="Photo" />
                                </div>
                                <div className="chat__item_content">
                                    <div className="chat__msg">{item.text}</div>
                                    <div className="chat__meta">
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                                <div ref={messagesEndRef}></div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="content__footer">
            <div className="sendnewmessage">
                <input type="text" placeholder="Type your message" value={textValue} onChange={e => setTextValue(e.target.value)} />
                <GiPaperPlane className='send-icon' onClick={sendMessage} />
            </div>
            </div>
        </div>
      )}
      })}
    </div>
  )
}
    
export default ChatBody