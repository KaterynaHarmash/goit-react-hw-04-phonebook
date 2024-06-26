import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // Завантаження контактів з localStorage при монтуванні компонента
  useEffect(() => {
    const savedContacts = JSON.parse(
      window.localStorage.getItem('userContacts')
    );
    if (savedContacts.length !== 0) {
      setContacts(savedContacts);
    }
  }, []); // Виконується тільки один раз при монтуванні компонента

  // Збереження контактів у localStorage при зміні стану contacts
  useEffect(() => {
    window.localStorage.setItem('userContacts', JSON.stringify(contacts));
  }, [contacts]); // Виконується при кожній зміні contacts

  const onDelete = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const addContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      return alert('This Contact is already in contacts');
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { ...newContact, id: nanoid() },
    ]);
  };

  const updateFilter = filterName => {
    setFilter(filterName);
  };

  let filteredContacts;
  if (contacts.length !== 0) {
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <main>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length !== 0 && (
        <div>
          <h2>Contacts</h2>
          <SearchBar filter={filter} onUpdateFilter={updateFilter} />
          <ContactsList contacts={filteredContacts} onDelete={onDelete} />
        </div>
      )}
    </main>
  );
};
