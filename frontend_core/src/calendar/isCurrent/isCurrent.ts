import type { Calendar } from "../calendar.js";

import { dateFns } from "../../date/mod.js";

export function isCurrent({ year, month }: Calendar): boolean {
    const now = dateFns.current();
    return year === now.year && month === now.month;
}
