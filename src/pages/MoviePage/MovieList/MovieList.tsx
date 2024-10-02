import { useDebounce } from '../../../hooks/useDebounce'
import PopularMovieList from './PopularMovieList'
import SearchedMovieList from './SearchedMovieList'

type MovieListProps = {
  searchTerm: string
}

const MovieList = ({ searchTerm }: MovieListProps) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  return (
    <div>
      {!debouncedSearchTerm ? (
        <PopularMovieList />
      ) : (
        <SearchedMovieList debouncedSearchTerm={debouncedSearchTerm} />
      )}
    </div>
  )
}

export default MovieList
