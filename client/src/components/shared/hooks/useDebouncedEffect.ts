import React from 'react';

export const useDebouncedEffect = (effect: React.EffectCallback, deps: React.DependencyList, ms: number): void => {
  React.useEffect(() => {
    const timeout = setTimeout(effect, ms);
    return () => {
      clearTimeout(timeout);
    }
  }, [effect, ms, deps])
}

export default useDebouncedEffect;
