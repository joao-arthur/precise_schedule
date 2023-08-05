import { formatDate } from "./formatDate/formatDate.js";
import { formatDay } from "./formatDay/formatDay.js";

export const dateFns = {
    formatDate,
    formatDay,
} as const;
