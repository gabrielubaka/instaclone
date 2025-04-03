import { useState, useEffect, useMemo } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    //retrive saved items from local storage via the key, if we have an item saved, we deserialize it using json parse, otherwise we return the default value we initialized it with.
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  useEffect(() => {
    //save to local storage, pass key and as well serialize the default value to be saved.key and state needs to be tracked by useEffect in case it changes, so we pass it in the dependency array.
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  const memoizedState = useMemo(() => state, [state]); //memoize state value if it has not changed.

  return [memoizedState, setState];
}
