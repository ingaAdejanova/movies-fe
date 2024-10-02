export type Movie = {
  id: string
  title: string
  poster_path: string
  release_date: string
  adult: boolean
  overview: string
}

export type MovieResponse = {
  results: Movie[]
  total_pages: number
  page: number
}
