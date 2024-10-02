import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../../../components/core/Image/Image';
import './MovieItem.scss';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

type MovieItemProps = {
  movie: Movie;
};

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null;

  return (
    <Link
      to={{
        pathname: `/movie/${movie.id}`,
      }}
      state={{ movie }}
      className="movie-item"
    >
      <Image
        src={posterUrl}
        alt={movie.title}
        rootMargin="100px"
        className="movie-item__poster"
      />
      <div className="movie-item__tag">Recently Added</div>
    </Link>
  );
};

export default MovieItem;
