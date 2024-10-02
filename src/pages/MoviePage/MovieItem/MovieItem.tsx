import { Link } from 'react-router-dom'
import { Movie } from '../../../redux/movieSlice'
import { Image } from '../../../components/core/Image/Image'
import { TMDB_IMAGE_BASE_URL } from '../../../constants'
import { ROUTES } from '../../../routes'
import './MovieItem.scss'

type MovieItemProps = {
  movie: Movie
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null

  return (
    <Link
      to={{
        pathname: `${ROUTES.MOVIES}/${movie.id}`,
      }}
      state={{ movie }}
      className="movie-item"
    >
      <Image src={posterUrl} alt={movie.title} rootMargin="100px" />
      <div className="movie-item__tag">Recently Added</div>
    </Link>
  )
}

export default MovieItem
