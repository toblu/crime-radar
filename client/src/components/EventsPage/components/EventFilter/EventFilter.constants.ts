import { format, subDays } from 'date-fns';

const dateFormat = 'yyyy-MM-dd';

const now = new Date();

export const LAST_7_DAYS = {
    from: format(subDays(now, 7), dateFormat),
    to: format(now, dateFormat)
};

export const LAST_30_DAYS = {
    from: format(subDays(now, 30), dateFormat),
    to: format(now, dateFormat)
};
