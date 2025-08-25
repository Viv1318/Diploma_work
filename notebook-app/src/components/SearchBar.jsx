import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, clearSelectedNote } from '../store/notesSlice';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(state => state.notes);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(clearSelectedNote());
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Поиск заметок..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchQuery && (
          <button onClick={clearSearch} className="clear-search">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;