type Function<T extends any[]> = (...args: T) => void;

export const throttle = <T extends any[]>(fn: Function<T>, timeout: number) => {
    let shouldThrottle = false;

    return (...args: T) => {
        if (shouldThrottle) return;
        shouldThrottle = true;
        fn(...args);
        setTimeout(() => {
            shouldThrottle = false;
        }, timeout);
    };
};
