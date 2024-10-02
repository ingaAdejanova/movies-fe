import { configureStore } from '@reduxjs/toolkit'
import searchMoviesReducer, { searchMovies, resetSearch } from '../../redux/searchMovieSlice'
import { fetchData } from '../../api/fetcher'

jest.mock('../../api/fetcher')

const initialState = {
  searchResults: [],
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

describe('searchMoviesSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({ reducer: { searchMovies: searchMoviesReducer } })
  })

  it('should return the initial state', () => {
    expect(store.getState().searchMovies).toEqual(initialState)
  })

  it('should handle resetSearch action', () => {
    store = configureStore({
      reducer: { searchMovies: searchMoviesReducer },
      preloadedState: {
        searchMovies: {
          ...initialState,
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
    })

    store.dispatch(resetSearch())

    const state = store.getState().searchMovies

    expect(state.searchResults).toEqual([])
    expect(state.pagination.currentPage).toBe(1)
  })

  it('should handle searchMovies fulfilled', async () => {
    mockFetchData.mockResolvedValueOnce(mockResponse)

    await store.dispatch(searchMovies({ query: 'test', page: 1 }))
    const state = store.getState().searchMovies
    expect(state.searchResults).toEqual(mockResponse.results)
    expect(state.pagination.totalPages).toBe(5)
    expect(state.pagination.currentPage).toBe(2)
    expect(state.isLoading).toBe(false)
  })

  it('should handle searchMovies rejected', async () => {
    const errorMessage = 'Failed to fetch search results'
    mockFetchData.mockRejectedValueOnce(new Error(errorMessage))

    await store.dispatch(searchMovies({ query: 'test', page: 1 }))
    const state = store.getState().searchMovies
    expect(state.error).toBe(errorMessage)
    expect(state.isLoading).toBe(false)
  })
})
