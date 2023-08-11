import { current } from "../current/current.js";

export function currentYear(): number {
    return current().year;
}
