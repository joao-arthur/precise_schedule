import type { Event } from "../event.js";

import { rep } from "../rep/rep.js";

export function repIter(evt: Event): IterableIterator<string | undefined> {
    let i = 0;

    return {
        next(): IteratorResult<string | undefined> {
            i++;
            const value = rep(evt, i);
            return {
                done: false,
                value,
            };
        },
        [Symbol.iterator](): IterableIterator<string | undefined> {
            return this;
        },
    };
}
