import { contactReducer } from './contacts/contacts.reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const { configureStore } = require('@reduxjs/toolkit');

const contactsConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const store = configureStore({
  reducer: {
    contactsStore: persistReducer(contactsConfig, contactReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
