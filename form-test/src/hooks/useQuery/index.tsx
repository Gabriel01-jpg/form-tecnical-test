import { useEffect, useState } from "react";

interface Query<T> {
  callbackFetch: () => Promise<T>
}

export function useQuery<T>({ callbackFetch }: Query<T> ) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T | null>(null);

  async function fetchData(){
    setIsLoading(true);
    try {
      const result = await callbackFetch();
      setData(result);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return { isLoading, error, data, fetchData }

}