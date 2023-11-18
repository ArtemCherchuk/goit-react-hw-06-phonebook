import React from 'react';

import css from 'components/ContactForm/ContactForm.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};
