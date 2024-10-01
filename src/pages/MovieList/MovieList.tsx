import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { fetchPopularMovies, searchMovies, resetSearch } from '../../redux/movieSlice';
import { RootState } from '../../redux/store';
import MovieItem from './MovieItem';
import SearchBar from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from '../../hooks/useDebounce';
import { useQueryParam } from '../../hooks/useQueryParam';
import './MovieList.scss';

const MovieList = () => {
    const dispatch = useAppDispatch();
    const {
        popularMovies,
        searchResults,
        loading,
        error,
        currentPopularPage,
        currentSearchPage,
        totalPopularPages,
        totalSearchPages,
    } = useAppSelector((state: RootState) => state.movies);

    const [searchTerm, setSearchTerm] = useQueryParam('query', '');
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
        <div className="movie-list">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <InfiniteScroll
                dataLength={debouncedSearchTerm ? searchResults.length : popularMovies.length}
                next={fetchData}
                hasMore={debouncedSearchTerm ? searchResults.length < totalSearchPages : popularMovies.length < totalPopularPages}
                loader={''}
                endMessage={<p>No more movies to load.</p>}
            >
                <div className="movies-grid">
                    {(debouncedSearchTerm ? searchResults : popularMovies).map((movie) => (
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default MovieList;
