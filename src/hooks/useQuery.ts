import { useCallback, useEffect, useState } from "react";

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  updateData: (updater: (currentData: T | null) => T) => void;
}

const useQuery = <T>(url: string): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateData = useCallback((updater: (currentData: T | null) => T) => {
    setData((prev) => updater(prev));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

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
    };

    fetchData();
  }, [url]);

  return { data, loading, error, updateData };
};

export default useQuery;
