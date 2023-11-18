const { createSlice } = require('@reduxjs/toolkit');

const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const initialState = {
  contacts: contactsList,
  filter: '',
};

const contactcSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    addContact(state, { payload }) {
      state.contacts.push(payload);
    },
    deleteContact(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
    filterValue(state, { payload }) {
      state.filter = payload;
    },
  },
});

// Генератори екшен криейторів
export const { addContact, deleteContact, filterValue } = contactcSlice.actions;
// Редюсер слайсу
export const contactReducer = contactcSlice.reducer;
