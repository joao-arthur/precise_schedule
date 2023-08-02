import { isCurrent } from "./isCurrent/isCurrent.js";
import { isDateIn } from "./isDateIn/isDateIn.js";
import { toPeriod } from "./toPeriod/toPeriod.js";
import { toTable } from "./toTable/toTable.js";

export const calendarFns = {
    isCurrent,
    isDateIn,
    toPeriod,
    toTable,
} as const;
