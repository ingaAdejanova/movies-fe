import { configureStore } from '@reduxjs/toolkit'
import popularMoviesReducer, { fetchPopularMovies } from '../../redux/popularMovieSlice'
import { fetchData } from '../../api/fetcher'

jest.mock('../../api/fetcher')

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
  pagination: { currentPage: 1, totalPages: 1 },
}

const mockResponse = {
  results: [
    {
      id: '1',
      title: 'Movie Title',
      poster_path: '/poster.jpg',
      release_date: '2021-01-01',
      adult: false,
      overview: 'A movie description',
    },
  ],
  total_pages: 5,
  page: 1,
}

const mockFetchData = fetchData as jest.Mock

describe('popularMoviesSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({ reducer: { popularMovies: popularMoviesReducer } })
  })

  it('should return the initial state', () => {
    expect(store.getState().popularMovies).toEqual(initialState)
  })

  it('should handle fetchPopularMovies fulfilled', async () => {
    mockFetchData.mockResolvedValueOnce(mockResponse)

    await store.dispatch(fetchPopularMovies(1))
    const state = store.getState().popularMovies
    expect(state.movies).toEqual(mockResponse.results)
    expect(state.pagination.totalPages).toBe(5)
    expect(state.pagination.currentPage).toBe(2)
    expect(state.isLoading).toBe(false)
  })

  it('should handle fetchPopularMovies rejected', async () => {
    const errorMessage = 'Failed to fetch movies'

    mockFetchData.mockRejectedValueOnce(new Error(errorMessage))

    await store.dispatch(fetchPopularMovies(1))
    const state = store.getState().popularMovies
    expect(state.error).toBe(errorMessage)
    expect(state.isLoading).toBe(false)
  })
})
