import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { searchMovies, resetSearch } from '../../../redux/searchMovieSlice'
import { RootState } from '../../../redux/store'
import { usePagination } from '../../../hooks/usePagination'
import MovieItem from '../MovieItem/MovieItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from '../../../components/core/Loader'
import './MovieList.scss'

type SearchedMovieListProps = {
  debouncedSearchTerm: string
}

const SearchedMovieList = ({ debouncedSearchTerm }: SearchedMovieListProps) => {
  const dispatch = useAppDispatch()

  const { searchResults, isLoading, pagination, error } = useAppSelector((state: RootState) => state.searchMovies)

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(resetSearch())
      dispatch(searchMovies({ query: debouncedSearchTerm, page: 1 }))
    }
  }, [dispatch, debouncedSearchTerm])

  const { loadMore } = usePagination({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    fetchNextPage: () => dispatch(searchMovies({ query: debouncedSearchTerm, page: pagination.currentPage })),
  })

  const loader = <div className="loader-container">{isLoading && <Loader />}</div>

  return (
    <>
      {!searchResults?.length && !isLoading && <div>No results found for your search</div>}
      {error && <div>{error}</div>}
      {loader}
      <InfiniteScroll
        dataLength={searchResults.length}
        next={loadMore}
        hasMore={pagination.currentPage < pagination.totalPages}
        loader={loader}
      >
        <div className="movie-list">
          {searchResults.map((movie, i) => (
            <MovieItem key={`${movie.id}-${i}`} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default SearchedMovieList
