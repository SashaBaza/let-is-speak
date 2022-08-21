import React, { useState, useEffect } from 'react';
import './chatList.css';
import Me from '../../assets/Me.png'
import Alice from '../../assets/Alice.jpg'
import David from '../../assets/David.jpg'
import Katy from '../../assets/Katy.jpg'
import Mickle from '../../assets/Mickle.jpg'
import Nency from '../../assets/Nency.jpg'
import Stivy from '../../assets/Stivy.jpg'
import {CgCheckO} from 'react-icons/cg'
import {AiOutlineSearch} from 'react-icons/ai'
// import { AliceM, MickleM, KatyM } from '../chatBody/Chats';


const ChatList = ({setData, message}) => {
    // Статичний список контактів
    let listChatUsers = [
        {
            image: Alice,
            id: 1,
            name: 'Alice Freeman',
            selected: false,
            date: 'Jun 20, 2022',
            // chat: AliceM,
        },
        {
            image: David,
            id: 2,
            name: 'David Ronal',
            selected: false,
            date: 'Feb 12, 2022',
            // chat: 'David',
        },
        {
            image: Katy,
            id: 3,
            name: 'Katy Fortado',
            selected: false,
            date: 'Mar 31, 2022',
            // chat: KatyM,
        },
        {
            image: Mickle,
            id: 4,
            name: 'Mickle Kora',
            selected: false,
            date: 'Apr 1, 2022',
            // chat: MickleM,
        },
        {
            image: Nency,
            id: 5,
            name: 'Nency Eglbe',
            selected: false,
            date: 'May 19, 2022',
            // chat: 'Nency',
        },
        {
            image: Stivy,
            id: 6,
            name: 'Stivy Sherrif',
            selected: false,
            date: 'Aug 9, 2022',
            // chat: 'Stivy',
        },
    ];

    // Підтягує статичний список контактів
    const [list, setList] = useState([...listChatUsers])
    // Присвоює конкретному контакту при кліку active
    const [active, setActive] = useState(null)
    
    // При виборі конкретного контакту, він стає активним та міняється значення selected на true
    useEffect(() => {
        list.map(item => {
            active == item ? item.selected = true : item.selected = false
        })
        setData([...list])
        // Фільтруєм список контактів, знаходимо обраний контакт, повертаємо масив зі значенням chat
        // const data = list.filter(person => person.selected === true).map(data => data.chat)
        // setData(data)
    }, [active])

    // Фільтр для списку контактів
    const [filteredContacts, setFilteredContacts] = useState(list)
    const filterBySearch = e => {
        const query = e.target.value;
        let updatedContacts = [...list];
        updatedContacts = updatedContacts.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })
        setFilteredContacts(updatedContacts);
    }
    
    // Задаю формат дати і години для ChatList
    // const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
    
  return (
    <div className="chat-list">
        <div className='head-list'>
            <div className='photo-profile'>
                <img className='person-photo' src={Me} alt="My Photo" />
                <CgCheckO className='online'/>
            </div>
            <div className="input-field">
                <AiOutlineSearch className='search-icon' />
                <input className='search-chat' type="text" onChange={filterBySearch} placeholder='Search or start new chat'/>
            </div>  
        </div>
        <h2>Chats</h2>
        <div className='messages'>
            {filteredContacts.map(item => {
                return (
                    <div key={item.id} onClick={() => setActive(item)} className={`message-info ${active == item && 'active'}`}>
                        <div className='photo-profile'>
                            <img className='person-photo' src={item.image} alt="My Photo" />
                            <CgCheckO className='online'/>
                        </div>
                        <div className="message-name">
                            <h6>{item.name}</h6>
                            <p>{message}</p>
                        </div>
                        <div className="date">
                            <p>{item.date}</p>
                        </div>
                    </div>)
            })}
        </div>
    </div>
  )
}

export default ChatList;