import { useEffect, useRef, useState } from 'react'

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // use useRef to wrap an object/array argument
  // which is a useEffect dependency

  const options = useRef(_options).current

  useEffect(() => {
    console.log(options)
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()

        setIsLoading(false)
        setData(json)
        setError(null)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('the fetch was aborted')
        } else {
          setIsLoading(false)
          setError('could not fetch the data')
        }
      }
    }
    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, options])

  return { data, isLoading, error }
}
