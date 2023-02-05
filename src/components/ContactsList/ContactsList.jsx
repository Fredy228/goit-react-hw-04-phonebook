import {ListContacts, ItemContact, Button, Text} from './ContactsList.styled';
import PropTypes from 'prop-types';

export const ContactsList = ({findContactsByName, contacts, deleteContact}) => {
    let foundContacts = findContactsByName();
    let renderCondition = foundContacts.length > 0 ? (foundContacts) : (contacts);
    return (
        <ListContacts>
            {renderCondition.map(contact => {
                return (
                    <ItemContact key={contact.id}>
                        <Text>{contact.name}: {contact.number}</Text> 
                        <Button type='button' onClick={() => deleteContact(contact.id)}>Delete</Button>
                    </ItemContact>
                )
            })}
        </ListContacts>
    )
}

ContactsList.propTypes = {
    findContactsByName: PropTypes.func,
    deleteContact: PropTypes.func,
    contacts: PropTypes.arrayOf(PropTypes.object)
}