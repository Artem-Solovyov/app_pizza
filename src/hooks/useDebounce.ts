import {useCallback, useRef} from "react";

const useDebounce = (callback: (value: string ) => void, delay: number) => {
  const timer = useRef()

  const debouncedCallback = useCallback((...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    // @ts-ignore
    timer.current = setTimeout(() => {
      // @ts-ignore
      callback(...args)
    }, delay)
  }, [callback, delay])
  return debouncedCallback
};

export default useDebounce;