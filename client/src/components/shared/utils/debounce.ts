type Function<T extends any[]> = (...args: T) => void;

export const debounce = <T extends any[]>(fn: Function<T>, timeout: number) => {
    let timer: NodeJS.Timer;
    return (...args: T) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(...args), timeout);
    };
};
