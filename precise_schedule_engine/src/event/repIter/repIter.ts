import type { Event } from "../event.js";

import { rep } from "../rep/rep.js";

export function repIter(evt: Event): IterableIterator<string | undefined> {
    let curr: string | undefined = evt.d;

    return {
        next(): IteratorResult<string | undefined> {
            if (!curr) {
                return {
                    done: false,
                    value: undefined,
                };
            }
            const value = rep({ d: curr, freq: evt.freq });
            curr = value;
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
