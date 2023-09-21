import React, { useState } from 'react';

type FilterBarProps = {
  onSearch: (query: string) => void;
  onSortByName: () => void,
  onSortByAge: () => void,
  onReset: () => void,
};

const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearch, 
  onSortByName,
  onSortByAge,
  onReset,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <br/>
      <button onClick={() => onReset()}>Reset</button>

      <button onClick={() => onSortByName()}>Sort by name</button>

      <button onClick={() => onSortByAge()}>Sort by age</button>
    </div>
  );
};

export default FilterBar;
