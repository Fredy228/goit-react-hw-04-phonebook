import {useState} from "react";
import {From, Input, Label, Button} from './Phonebook.styled';
import PropTypes from 'prop-types';

export const Phonebook = ({addContact}) => {

    const [nameContact, setNameContact] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = event => {
        const {value, name} = event.currentTarget;
        switch (name) {
            case 'name':
                setNameContact(value)
                break
            case 'number':
                setNumber(value)
                break
            default:
                break;
        }
      }
    
    const submitForm = event => {
        event.preventDefault();
        addContact(nameContact, number);
        setNameContact('');
        setNumber('');

    }
    return (
        <From onSubmit={submitForm}>
        <Label>
            Name
            <Input
            type="text"
            name="name"
            value={nameContact}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            />
        </Label>
        <Label>
            Number
            <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            />
        </Label>
        <Button type='submit'>Add contact</Button>
    </From>
    )
    }

Phonebook.propTypes = {
    addContact: PropTypes.func
}

