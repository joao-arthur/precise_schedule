import isSameDay from "date-fns/isSameDay";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import add from "date-fns/add";

function isInBetween(day: Date, start: Date, end: Date) {
    if (isSameDay(start, day)) return true;
    if (isSameDay(end, day)) return true;
    return isAfter(day, start) && isBefore(day, end);
}

function isInBetweenRepeat(
    day: Date,
    start: Date,
    end: Date,
    duration: Duration | undefined,
): boolean {
    if (isInBetween(day, start, end)) return true;
    if (isAfter(end, day)) return false;
    if (!duration) return false;
    return isInBetweenRepeat(
        day,
        add(start, duration),
        add(end, duration),
        duration,
    );
}

function formatTime(date: Date) {
    return new Date()
        .toISOString()
        .slice(
            date.toISOString().indexOf("T") + 1,
            date.toISOString().indexOf("T") + 6,
        );
}

export const dateFns = {
    isInBetween,
    isInBetweenRepeat,
    formatTime,
};
