import {useState, useEffect, useRef} from "react";
import {Container, Title} from './App.styled';
import {Phonebook} from '../Phonebook/Phonebook';
import {Filter} from '../Filter/Filter';
import {ContactsList} from '../ContactsList/ContactsList';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_NAME = 'contacts-list';



export const App = () => {
  
  const firstStart = useRef(true);
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ])
  const [filter, setFilter] = useState('');

  const handleChangeFilter = event => setFilter(event.currentTarget.value);

  const addContact = (name, number) => {
    const haveContact = contacts.find( contact => contact.name === name || contact.number === number);
    if(haveContact) {
      alert(`${haveContact.name} is already in contacts`)
    } else {
      setContacts(prevS => {
        let arrContacts = [...prevS];
        arrContacts.push(
          {
            id: nanoid(),
            name,
            number
          }
        )
        return arrContacts
      })
    }
  }

  const findContactsByName = () => {
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  const deleteContact = (id) => {
    setContacts(prevS => prevS.filter(contact => contact.id !== id));
  }

  useEffect(() => {
    const getLocalStorage = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME));
    if (getLocalStorage !== null) {
      setContacts(getLocalStorage)
    }
  }, [])

  useEffect(() => {
    if(firstStart.current) {
      firstStart.current = false;
      return;
    } 
    window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(contacts));

  }, [contacts])
  
    return (
      <Container>
        <Title>Phonebook</Title>
        <Phonebook addContact={addContact}/>
        <Title>Contacts</Title>
        <Filter handleChangeFilter={handleChangeFilter}/>
        <ContactsList 
        findContactsByName={findContactsByName}
        contacts={contacts}
        deleteContact={deleteContact}/>
      </Container>
    )
  }
