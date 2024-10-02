import { configureStore } from '@reduxjs/toolkit'
import movieReducer, { fetchPopularMovies, searchMovies, resetSearch } from '../../redux/movieSlice'
import { fetchData } from '../../api/fetcher'

jest.mock('../../api/fetcher')

const initialState = {
  movieLists: {
    popularMovies: [],
    searchResults: [],
  },
  isLoading: false,
  errors: {
    popularError: null,
    searchError: null,
  },
  pagination: {
    popularMovies: { currentPage: 1, totalPages: 1 },
    searchResults: { currentPage: 1, totalPages: 1 },
  },
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

describe('moviesSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({ reducer: { movies: movieReducer } })
  })

  it('should return the initial state', () => {
    expect(store.getState().movies).toEqual(initialState)
  })

  it('should handle resetSearch action', () => {
    store = configureStore({
      reducer: { movies: movieReducer },
      preloadedState: {
        movies: {
          ...initialState,
          movieLists: {
            ...initialState.movieLists,
            searchResults: [
              {
                id: '1',
                title: 'Test Movie',
                poster_path: '/test.jpg',
                release_date: '2021-01-01',
                adult: false,
                overview: 'Test overview',
              },
            ],
          },
        },
      },
    })

    store.dispatch(resetSearch())

    const state = store.getState().movies

    expect(state.movieLists.searchResults).toEqual([])
    expect(state.pagination.searchResults.currentPage).toBe(1)
  })

  it('should handle fetchPopularMovies fulfilled', async () => {
    mockFetchData.mockResolvedValueOnce(mockResponse)

    await store.dispatch(fetchPopularMovies(1))
    const state = store.getState().movies
    expect(state.movieLists.popularMovies).toEqual(mockResponse.results)
    expect(state.pagination.popularMovies.totalPages).toBe(5)
    expect(state.pagination.popularMovies.currentPage).toBe(2)
    expect(state.isLoading).toBe(false)
  })

  it('should handle fetchPopularMovies rejected', async () => {
    const errorMessage = 'Failed to fetch movies'

    mockFetchData.mockRejectedValueOnce(new Error(errorMessage))

    await store.dispatch(fetchPopularMovies(1))
    const state = store.getState().movies
    expect(state.errors.popularError).toBe(errorMessage)
    expect(state.isLoading).toBe(false)
  })

  it('should handle searchMovies fulfilled', async () => {
    mockFetchData.mockResolvedValueOnce(mockResponse)

    await store.dispatch(searchMovies({ query: 'test', page: 1 }))
    const state = store.getState().movies
    expect(state.movieLists.searchResults).toEqual(mockResponse.results)
    expect(state.pagination.searchResults.totalPages).toBe(5)
    expect(state.pagination.searchResults.currentPage).toBe(2)
    expect(state.isLoading).toBe(false)
  })

  it('should handle searchMovies rejected', async () => {
    const errorMessage = 'Failed to fetch search results'
    mockFetchData.mockRejectedValueOnce(new Error(errorMessage))

    await store.dispatch(searchMovies({ query: 'test', page: 1 }))
    const state = store.getState().movies
    expect(state.errors.searchError).toBe(errorMessage)
    expect(state.isLoading).toBe(false)
  })
})
