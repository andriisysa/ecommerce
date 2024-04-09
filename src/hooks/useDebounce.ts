import { useState, useEffect } from 'react';

/**
 * Debounce an value.
 */
const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounce, onDebounce] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => onDebounce(value), delay || 500);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
};

export default useDebounce;