import React from 'react';
import { Search } from '../Icons'
import './SearchBar.scss';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                placeholder="Search for a movie..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button className="search-button">
                <Search />
            </button>
        </div>
    );
};
