import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { setName, setNumber } from 'redux/dataContact/dataContact.reducer';
import { addContact } from 'redux/contacts/contacts.reducer';

import css from 'components/ContactForm/ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.dataContactStore.name);
  const number = useSelector(state => state.dataContactStore.number);
  const contacts = useSelector(state => state.contactsStore.contacts);

  const onFormSubmit = e => {
    e.preventDefault();

    const newUser = {
      id: nanoid(),
      name: name,
      number: Number.parseFloat(number),
    };

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

    dispatch(addContact(newUser));
    dispatch(setName(''));
    dispatch(setNumber(''));
  };

  const onChangeInput = e => {
    const value = e.target.value;
    const nameInput = e.target.name;

    switch (nameInput) {
      case 'name':
        dispatch(setName(value));
        return;

      case 'number':
        dispatch(setNumber(value));
        return;

      default:
        return;
    }
  };

  return (
    <form className={css.form} onSubmit={onFormSubmit}>
      <label className={css.labelForm}>Name</label>
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className={css.inputForm}
        value={name}
        onChange={onChangeInput}
      />
      <label className={css.labelForm}>Number</label>
      <input
        type="tel"
        name="number"
        required
        placeholder="Your number"
        pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$"
        className={css.inputForm}
        value={number}
        onChange={onChangeInput}
      />
      <button type="submit" className={css.button}>
        Add Contact
      </button>
    </form>
  );
};
