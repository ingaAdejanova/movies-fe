import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../api/fetcher'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

type UseFetchParams = {
  url: string
  shouldFetch?: boolean
}

export const useFetch = <T>({ url, shouldFetch = true }: UseFetchParams): FetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDataAndSetState = useCallback(async () => {
    if (!shouldFetch) return;

    setLoading(true)
    setError(null)

    try {
      const response: T = await fetchData<T>({ url })
      setData(response)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url, shouldFetch])

  useEffect(() => {
    fetchDataAndSetState()
  }, [fetchDataAndSetState])

  return { data, loading, error }
}
