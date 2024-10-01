import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../api/fetcher'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDataAndSetState = useCallback(async () => {
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
  }, [url])

  useEffect(() => {
    fetchDataAndSetState()
  }, [fetchDataAndSetState])

  return { data, loading, error }
}