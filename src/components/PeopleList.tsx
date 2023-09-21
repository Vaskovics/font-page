import React from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  onDelete: (slug: string) => void;
  onEdit: (person: Person) => void;
  nameToEdit: Person | null;
  onChangeInputName: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};

const PeopleList: React.FC<Props> = ({ 
  people, 
  onDelete, 
  onEdit, 
  nameToEdit,
  onChangeInputName,
  onEnter,
}) => {
  console.log(people);


  return (
    <ul style={{ listStyle: 'none' }}>
      {people.map((person) => (
        <li key={person.slug} >
          {nameToEdit && nameToEdit.slug === person.slug ? (
            <input
              type="text"
              defaultValue={nameToEdit.name}
              onChange={onChangeInputName}
              onKeyDown={onEnter}
            />
          ) : (
            <>
              {person.name} - {person.born}{' '}
              <button onClick={() => onDelete(person.slug)}>Delete</button>
              <button onClick={() => onEdit(person)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PeopleList;
