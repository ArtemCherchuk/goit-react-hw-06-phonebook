import React from 'react';
import css from 'components/ContactList/ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts.reducer';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.contactsStore.filter);

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContacts();

  return (
    <ul className={css.list}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(item => {
          return (
            <li key={item.id} className={css.listItem}>
              <p>{item.name}</p>
              <span>{item.number}</span>
              <button
                type="button"
                className={css.button}
                onClick={() => dispatch(deleteContact(item.id))}
              >
                Delete
              </button>
            </li>
          );
        })
      ) : (
        <p>Sorry, no contacts :( </p>
      )}
    </ul>
  );
};
