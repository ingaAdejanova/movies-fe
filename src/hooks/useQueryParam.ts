import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useQueryParam = (paramName: string, defaultValue: string = '') => {
  const location = useLocation()
  const navigate = useNavigate()

  const getQueryParams = useCallback(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get(paramName) || defaultValue
  }, [location.search, paramName, defaultValue])

  const [paramValue, setParamValue] = useState(getQueryParams)

  const updateURL = useCallback(
    (newParamValue: string) => {
      const searchParams = new URLSearchParams(location.search)
      if (newParamValue) {
        searchParams.set(paramName, newParamValue)
      } else {
        searchParams.delete(paramName)
      }
      navigate({ search: searchParams.toString() }, { replace: true })
    },
    [paramName, navigate, location.search],
  )

  useEffect(() => {
    const currentParamValue = getQueryParams()
    if (currentParamValue !== paramValue) {
      setParamValue(currentParamValue)
    }
  }, [location.search, paramValue, getQueryParams])

  const setQueryParam = useCallback(
    (newValue: string) => {
      setParamValue(newValue)
      updateURL(newValue)
    },
    [setParamValue, updateURL],
  )

  return [paramValue, setQueryParam] as const
}