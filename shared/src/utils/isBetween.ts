export const isBetween = (start: number, end: number) => (
    value: number
): boolean => value >= start && value <= end;
