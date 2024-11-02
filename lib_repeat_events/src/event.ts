import { Temporal } from "@js-temporal/polyfill";

export type Frequency =
    | "1D"
    | "2D"
    | "1W"
    | "1M"
    | "3M"
    | "6M"
    | "1Y"
    | "2Y"
    | undefined;

export type Event = {
    readonly d: string;
    readonly freq: Frequency;
};

export function closestRep(evt: Event, date: string): string | undefined {
    const evtDt = Temporal.PlainDate.from(evt.d);
    const dateDt = Temporal.PlainDate.from(date).subtract({ days: 1 });
    if (Temporal.PlainDate.compare(evtDt, dateDt) === 1) {
        return undefined;
    }
    const d = evtDt.until(dateDt, { largestUnit: "days" }).days;
    const w = evtDt.until(dateDt, { largestUnit: "weeks" }).weeks;
    const m = evtDt.until(dateDt, { largestUnit: "months" }).months;
    const y = evtDt.until(dateDt, { largestUnit: "years" }).years;
    switch (evt.freq) {
        case "1D":
            return evtDt.add({ days: d }).toString();
        case "2D":
            return evtDt.add({ days: d - (d % 2) }).toString();
        case "1W":
            return evtDt.add({ weeks: w }).toString();
        case "1M":
            return evtDt.add({ months: m }).toString();
        case "3M":
            return evtDt.add({ months: m - (m % 3) }).toString();
        case "6M":
            return evtDt.add({ months: m - (m % 6) }).toString();
        case "1Y":
            return evtDt.add({ years: y }).toString();
        case "2Y":
            return evtDt.add({ years: y - (y % 2) }).toString();
        case undefined:
            return undefined;
    }
}

export function rep(evt: Event, i = 1): string | undefined {
    const evtAsPlainDate = Temporal.PlainDate.from(evt.d);
    switch (evt.freq) {
        case "1D":
            return evtAsPlainDate.add({ days: 1 * i }).toString();
        case "2D":
            return evtAsPlainDate.add({ days: 2 * i }).toString();
        case "1W":
            return evtAsPlainDate.add({ days: 7 * i }).toString();
        case "1M":
            return evtAsPlainDate.add({ months: 1 * i }).toString();
        case "3M":
            return evtAsPlainDate.add({ months: 3 * i }).toString();
        case "6M":
            return evtAsPlainDate.add({ months: 6 * i }).toString();
        case "1Y":
            return evtAsPlainDate.add({ years: 1 * i }).toString();
        case "2Y":
            return evtAsPlainDate.add({ years: 2 * i }).toString();
    }
    return undefined;
}

export function repLazy(evt: Event): IterableIterator<string | undefined> {
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

export function repInPeriod(evt: Event, begin: string, end: string): string[] {
    let res: string[] = [];
    if (Temporal.PlainDate.compare(evt.d, end) === 1) {
        return res;
    }
    let base: string | undefined;
    if (Temporal.PlainDate.compare(evt.d, begin) === 1) {
        base = evt.d;
        res.push(base);
    } else {
        base = closestRep(evt, begin);
    }
    if (!base) {
        return res;
    }
    const it = repLazy({ d: base, freq: evt.freq });
    let current = it.next().value;
    while (current !== undefined && Temporal.PlainDate.compare(current, end) < 1) {
        res.push(current);
        current = it.next().value;
    }
    return res;
}
