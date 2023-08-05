import { formatDate } from "./formatDate/formatDate.js";
import { formatDay } from "./formatDay/formatDay.js";
import { current } from "./current/current.js";
import { currentYear } from "./currentYear/currentYear.js";
import { currentMonth } from "./currentMonth/currentMonth.js";

export const dateFns = {
    formatDate,
    formatDay,
    current,
    currentYear,
    currentMonth,
} as const;
