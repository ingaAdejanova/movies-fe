import axios, { AxiosResponse, Method } from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3/'
const BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmJiZWE0NTEwNjFjYjVjZGMxN2YxMTBhYTQwMDczZiIsIm5iZiI6MTcyNzcwNTM2NS45NTQ5NSwic3ViIjoiNjZmYWIwMDc5YzY4NmE0NjAyMTMzN2JhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.MBEU4x1DBC5RWCM-lgxeFTkMx_xXl5BMmFUiiMwJ3w4'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
})

export const fetchData = async <T>({
  url,
  method = 'get',
  params,
  data,
}: {
  url: string
  method?: Method
  params?: any
  data?: any
}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      url,
      method,
      params,
      data,
    })
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message)
    }
    throw new Error('An unexpected error occurred')
  }
}
