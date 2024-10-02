import { useCallback } from 'react'

type UsePaginationProps = {
  currentPage: number
  totalPages: number
  fetchNextPage: () => void
}

export const usePagination = ({ currentPage, totalPages, fetchNextPage }: UsePaginationProps) => {
  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      fetchNextPage()
    }
  }, [currentPage, totalPages, fetchNextPage])

  return { loadMore }
}
