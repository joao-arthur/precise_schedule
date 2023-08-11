import { current } from "../current/current.js";

export function currentMonth(): number {
    return current().month;
}
