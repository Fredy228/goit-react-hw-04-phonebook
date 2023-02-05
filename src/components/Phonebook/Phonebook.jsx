import React from "react";
import {From, Input, Label, Button} from './Phonebook.styled';
import PropTypes from 'prop-types';

class Phonebook extends React.Component {

    state = {
        name: '',
        number: ''
    }

    handleChange = event => {
        const {value, name} = event.currentTarget;
        this.setState({[name]: value})
      }
    
    submitForm = (event) => {
        event.preventDefault();
        this.props.addContact(this.state);
        event.currentTarget.reset()

    }

    render () {
        return (
            <From onSubmit={this.submitForm}>
            <Label>
                Name
                <Input
                type="text"
                name="name"
                value={this.name}
                onChange={this.handleChange}
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
                value={this.number}
                onChange={this.handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                />
            </Label>
            <Button type='submit'>Add contact</Button>
        </From>
        )
    }
}

Phonebook.propTypes = {
    addContact: PropTypes.func
}

export default Phonebook;
