// App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { getPeople } from './api';
import { Person } from './types/Person';
import PeopleList from './components/PeopleList';
import FilterBar from './components/FilterBar';
import { SortBy } from './types/SortBy';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.default);
  const [personToEdit, setPersonToEdit] = useState<Person | null>(null);
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sortBy === SortBy.name) {
      setFilteredPeople((prevPeople) =>
        [...prevPeople].sort((person1, person2) =>
          person1.name.localeCompare(person2.name)
        )
      );
    }

    if (sortBy === SortBy.birth) {
      setFilteredPeople((prevPeople) =>
        [...prevPeople].sort((person1, person2) =>
          person1.born - person2.born,
        )
      );
    }

    if(sortBy === SortBy.default) {
      setFilteredPeople(people);
    }
  }, [sortBy]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data) => {
        setPeople(data);
        setFilteredPeople(data); // Initialize filtered list with all people
      })
      .catch((error) => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Callback function to filter people based on search query
  const handleSearch = (query: string) => {
    if (query === '') {
      // If search query is empty, show all people
      setFilteredPeople(people);
    } else {
      // Filter people whose names include the search query (case-insensitive)
      const filtered = people.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPeople(filtered);
    }
  };

  const hanleSortByName = () => {
    setSortBy(SortBy.name);
  }

  const handleSortByAge = () => {
    setSortBy(SortBy.birth);
  }

  const handleReset = () => {
    setSortBy(SortBy.default);
    setFilteredPeople(people);
  }

  const handleOnDelete = (slug: string) => {
    setFilteredPeople(prevPeople => prevPeople.filter(person => person.slug !== slug))
  }

  const handleEditName = (person: Person) => {
    setPersonToEdit(person);
  }

  const handleInputNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setNewName(newName);
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFilteredPeople(prevPeople => prevPeople.map(person => {
        if (person.slug === personToEdit?.slug) {
          return {
            ...person,
            name: newName,
          }
        }
  
        return person;
      }))

      setPersonToEdit(null);
      setNewName('');
    }

  }

  const handleCancel = () => {
    setPersonToEdit(null);
    setNewName('');
  }

  console.log(filteredPeople);
  return (
    <div className="App">
      <h1>Page Font</h1>
      {isLoading ? 'Is loading...' : (
        <>
          <FilterBar
            onSearch={handleSearch}
            onSortByName={hanleSortByName}
            onSortByAge={handleSortByAge}
            onReset={handleReset}
          />
          <PeopleList 
            people={filteredPeople}
            onDelete={handleOnDelete}
            onEdit={handleEditName}
            nameToEdit={personToEdit}
            onChangeInputName={handleInputNewName}
            onEnter={handleEnter}
            onCancel={handleCancel}
          />
        </>
      )}
    </div>
  );
}

export default App;
