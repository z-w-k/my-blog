import { useEffect } from "react";

export const useAsyncEffect = (
  effect: () => Promise<void | (() => void)>,
  dependencies?: unknown[]
) => {
  useEffect(() => {
    const cleanupPromise = effect();
    return () => {
      cleanupPromise.then(cleanup => {
        if (cleanup && typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, dependencies);
};