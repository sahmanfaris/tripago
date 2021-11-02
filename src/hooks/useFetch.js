import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await fetch(url);
      const json = await res.json();

      setIsLoading(false);
      setData(json);
    };
    fetchData();
  }, [url]);

  return { data, isLoading };
};
