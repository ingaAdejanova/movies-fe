import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { fetchPopularMovies } from '../../../redux/popularMovieSlice'
import { RootState } from '../../../redux/store'
import { usePagination } from '../../../hooks/usePagination'
import MovieItem from '../MovieItem/MovieItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from '../../../components/core/Loader'
import './MovieList.scss'

const PopularMovieList = () => {
  const dispatch = useAppDispatch()

  const { movies, isLoading, pagination, error } = useAppSelector((state: RootState) => state.popularMovies)

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchPopularMovies(1))
    }
  }, [dispatch, movies.length])

  const { loadMore } = usePagination({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    fetchNextPage: () => dispatch(fetchPopularMovies(pagination.currentPage)),
  })

  const loader = <div className="loader-container">{isLoading && <Loader />}</div>

  return (
    <>
      {!movies?.length && !isLoading && <div>No popular movies found</div>}
      {error && <div>{error}</div>}
      {loader}
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={pagination.currentPage < pagination.totalPages}
        loader={loader}
      >
        <div className="movie-list">
          {movies.map((movie, i) => (
            <MovieItem key={`${movie.id}-${i}`} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default PopularMovieList
