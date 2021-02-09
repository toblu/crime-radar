import React from 'react';

export const useDebouncedEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  ms: number
): void => {
  const dependencies = [...deps, ms];
  React.useEffect(() => {
    const timeout = setTimeout(effect, ms);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useDebouncedEffect;
