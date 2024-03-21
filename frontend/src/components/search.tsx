// SearchComponent.tsx
import React from 'react';
import { useSearchContext } from './SearchContext'; // Import the useSearchContext hook
import search from "../assets/search.svg";

const SearchComponent = () => {
  const { searchQuery, setSearchQuery } = useSearchContext(); // Use the context

  const handleSearch = () => {
    // Your search logic here
    console.log('Search query:', searchQuery);
    // You can perform additional actions here, like triggering a search request
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <img src={search} alt="search-icon" />
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        onKeyDown={handleKeyDown} 
      />
    </div>
  );
};

export default SearchComponent;
