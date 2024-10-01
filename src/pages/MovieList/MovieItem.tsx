import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './MovieItem.scss';

const MovieItem: React.FC<{ movie: any }> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="movie-item"> {/* Use Link for routing */}
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <div className="tag">Recently Added</div>
        </Link>
    );
};

export default MovieItem;
