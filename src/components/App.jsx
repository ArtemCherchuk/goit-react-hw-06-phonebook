import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from 'components/ContactForm/ContactForm.module.css';
import {
  addContact,
  deleteContact,
  filterValue,
} from 'redux/contacts/contacts.reducer';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.contactsStore.filter);

  // const [contacts, setContacts] = useState(() => {
  //   return (
  //     JSON.parse(localStorage.getItem('contacts')) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  //   );
  // });

  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const stringJsonContacts = JSON.stringify(contacts);
  //   localStorage.setItem('contacts', stringJsonContacts);
  // }, [contacts]);

  const onChangeInput = e => {
    const value = e.target.value;
    dispatch(filterValue(value));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const onAddContact = newUser => {
    const hasDuplicates = contacts.some(
      item =>
        item.name.toLowerCase() === newUser.name.toLowerCase() ||
        item.number === newUser.number
    );

    if (hasDuplicates) {
      alert(
        `A contact with the name: '${newUser.name}' and 
        number: '${newUser.number}' is already in the list!`
      );
      return;
    }

    const user = {
      ...newUser,
      id: nanoid(),
    };
    dispatch(addContact(user));
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter changeInput={onChangeInput} filter={filter} />
      <ContactList option={filterContacts()} deleteContact={onDeleteContact} />
    </div>
  );
};
