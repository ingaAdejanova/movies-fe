import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { fetchPopularMovies, searchMovies, resetSearch } from '../../../redux/movieSlice'
import { RootState } from '../../../redux/store'
import { usePagination } from '../../../hooks/usePagination'
import MovieItem from '../MovieItem/MovieItem'
import { Loader } from '../../../components/core/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDebounce } from '../../../hooks/useDebounce'
import './MovieList.scss'

type MovieListProps = {
  searchTerm: string
}

const MovieList = ({ searchTerm }: MovieListProps) => {
  const dispatch = useAppDispatch()
  const {
    movieLists: { popularMovies, searchResults },
    isLoading,
    pagination,
    errors,
  } = useAppSelector((state: RootState) => state.movies)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(resetSearch())
      dispatch(searchMovies({ query: debouncedSearchTerm, page: 1 }))
    } else if (popularMovies.length === 0) {
      dispatch(fetchPopularMovies(1))
    }
  }, [dispatch, debouncedSearchTerm, popularMovies.length])

  const { loadMore: loadMorePopularMovies } = usePagination({
    currentPage: pagination.popularMovies.currentPage,
    totalPages: pagination.popularMovies.totalPages,
    fetchNextPage: () => dispatch(fetchPopularMovies(pagination.popularMovies.currentPage)),
  })

  const { loadMore: loadMoreSearchResults } = usePagination({
    currentPage: pagination.searchResults.currentPage,
    totalPages: pagination.searchResults.totalPages,
    fetchNextPage: () =>
      dispatch(searchMovies({ query: debouncedSearchTerm, page: pagination.searchResults.currentPage })),
  })

  const loadMoreMovies = () => {
    if (debouncedSearchTerm) {
      loadMoreSearchResults()
    } else {
      loadMorePopularMovies()
    }
  }

  const loader = <div className="loader-container">{isLoading && <Loader />}</div>

  return (
    <div>
      {!debouncedSearchTerm && popularMovies.length === 0 && !isLoading && <div>No popular movies found</div>}
      {debouncedSearchTerm && searchResults.length === 0 && !isLoading && <div>No results found for your search</div>}

      {errors.popularError && !debouncedSearchTerm && <div>{errors.popularError}</div>}
      {errors.searchError && debouncedSearchTerm && <div>{errors.searchError}</div>}

      {loader}
      <InfiniteScroll
        dataLength={debouncedSearchTerm ? searchResults.length : popularMovies.length}
        next={loadMoreMovies}
        hasMore={
          debouncedSearchTerm
            ? pagination.searchResults.currentPage < pagination.searchResults.totalPages
            : pagination.popularMovies.currentPage < pagination.popularMovies.totalPages
        }
        loader={loader}
      >
        <div className="movie-list">
          {(debouncedSearchTerm ? searchResults : popularMovies).map((movie, i) => (
            <MovieItem key={`${movie.id}-${i}`} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default MovieList
