import { useQueryParam } from '../../hooks/useQueryParam';
import { SearchBar } from '../../components/core/SearchBar/SearchBar';
import MovieList from './MovieList/MovieList';
import './MoviePage.scss';

const MoviePage = () => {
  const [searchTerm, setSearchTerm] = useQueryParam('query', '');

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MovieList searchTerm={searchTerm} />
    </>
  );
};

export default MoviePage;
