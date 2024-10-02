import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { fetchPopularMovies, searchMovies, resetSearch } from '../../../redux/movieSlice';
import { RootState } from '../../../redux/store';
import MovieItem from '../MovieItem/MovieItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from '../../../hooks/useDebounce';
import './MovieList.scss';

type MovieListProps = {
  searchTerm: string;
};

const MovieList: React.FC<MovieListProps> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  const {
    popularMovies,
    searchResults,
    loading,
    currentPopularPage,
    currentSearchPage,
    totalPopularPages,
    totalSearchPages,
  } = useAppSelector((state: RootState) => state.movies);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(resetSearch());
      dispatch(searchMovies({ query: debouncedSearchTerm, page: 1 }));
    } else if (popularMovies.length === 0) {
      dispatch(fetchPopularMovies(1));
    }
  }, [dispatch, debouncedSearchTerm, popularMovies.length]);

  const fetchData = () => {
    if (debouncedSearchTerm) {
      if (currentSearchPage < totalSearchPages) {
        dispatch(searchMovies({ query: debouncedSearchTerm, page: currentSearchPage + 1 }));
      }
    } else {
      if (currentPopularPage < totalPopularPages) {
        dispatch(fetchPopularMovies(currentPopularPage + 1));
      }
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}

      <InfiniteScroll
        dataLength={debouncedSearchTerm ? searchResults.length : popularMovies.length}
        next={fetchData}
        hasMore={debouncedSearchTerm ? searchResults.length < totalSearchPages : popularMovies.length < totalPopularPages}
        loader={<p>Loading more movies...</p>}
      >
        <div className="movie-list">
          {(debouncedSearchTerm ? searchResults : popularMovies).map((movie, i) => (
            <MovieItem key={`${movie.id}-${i}`} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default MovieList;
