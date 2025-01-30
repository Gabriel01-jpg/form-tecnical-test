import { useState } from "react";

interface MutationOptions<T, V> {
  callbackFetch: (variables: V) => Promise<T>;
}

export function useMutation<T, V>({ callbackFetch }: MutationOptions<T, V>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  async function mutate(variables: V) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await callbackFetch(variables);
      setData(response);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, data, mutate };
}
