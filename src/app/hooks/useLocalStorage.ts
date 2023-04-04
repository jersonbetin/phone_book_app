import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, fallbackValue: T) => {
  const [value, setValue] = useState(fallbackValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
