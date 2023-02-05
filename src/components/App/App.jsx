import React from "react";
import {Container, Title} from './App.styled';
import Phonebook from '../Phonebook/Phonebook';
import {Filter} from '../Filter/Filter';
import {ContactsList} from '../ContactsList/ContactsList';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_NAME = 'contacts-list';

class App extends React.Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  handleChangeFilter = event => {
    const {value} = event.currentTarget;
    this.setState({filter: value})
  }

  addContact = ({name, number}) => {
    const {contacts} = this.state;
    const haveContact = contacts.find( contact => contact.name === name || contact.number === number);
    if(haveContact) {
      alert(`${haveContact.name} is already in contacts`)
    } else {
      this.setState(prevState => {
        const arrContacts = [...prevState.contacts];
        arrContacts.push(
          {
            id: nanoid(),
            name,
            number
          }
        )
        return ({contacts: arrContacts})
      })
    }

  }

  findContactsByName = () => {
    const {contacts, filter} = this.state
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  componentDidMount() {
    const getLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    if (getLocalStorage !== null) {
      this.setState({contacts: getLocalStorage})
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.state.contacts))
    }
  }

  render() {
    
    return (
      <Container>
        <Title>Phonebook</Title>
        <Phonebook addContact={this.addContact}/>
        <Title>Contacts</Title>
        <Filter handleChangeFilter={this.handleChangeFilter}/>
        <ContactsList 
        findContactsByName={this.findContactsByName}
        contacts={this.state.contacts}
        deleteContact={this.deleteContact}/>
      </Container>
    )
  }
};

export default App;
