import { useCallback, useState } from "react";

export interface FetchOptions {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit;
}

interface UseMutateResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (url: string, options: FetchOptions) => Promise<void>;
}

const useMutate = <T>(): UseMutateResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (url: string, options: FetchOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
};

export default useMutate;
