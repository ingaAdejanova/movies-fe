import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '../../components/core/SearchBar'
import '@testing-library/jest-dom'

const setSearchTermMock = jest.fn()

const setup = (searchTerm: string = '') => {
  render(<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTermMock} />)
}

describe('SearchBar', () => {
  beforeEach(() => {
    setSearchTermMock.mockClear()
  })

  test('renders search input correctly', () => {
    setup('')

    const input = screen.getByPlaceholderText('Search for a movie...')
    expect(input).toBeInTheDocument()

    expect(input).toHaveValue('')
  })

  test('renders with initial search term', () => {
    const initialSearchTerm = 'Movie'
    setup(initialSearchTerm)

    const input = screen.getByPlaceholderText('Search for a movie...')
    expect(input).toHaveValue(initialSearchTerm)
  })

  test('calls setSearchTerm on user input', () => {
    setup('')

    const input = screen.getByPlaceholderText('Search for a movie...')
    fireEvent.change(input, { target: { value: 'The Matrix' } })

    expect(setSearchTermMock).toHaveBeenCalledTimes(1)
    expect(setSearchTermMock).toHaveBeenCalledWith('The Matrix')
  })
})
