import { Search } from '../Icons'
import './SearchBar.scss'

type SearchBarProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => (
  <div className="search-bar">
    <input
      type="text"
      value={searchTerm}
      placeholder="Search for a movie..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar__input"
    />
    <div className="search-bar__wrapper">
      <Search className="search-bar__wrapper__icon" />
    </div>
  </div>
)
