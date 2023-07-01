const PREFIX = "@PreciseSchedule/";

function getItem<T>(item: string): T | undefined {
    const value = localStorage.getItem(PREFIX + item);
    return value === null ? undefined : JSON.parse(value);
}

function setItem<T>(item: string, value: T): void {
    localStorage.setItem(PREFIX + item, JSON.stringify(value));
}

function removeItem(item: string): void {
    localStorage.removeItem(PREFIX + item);
}

export const localStorageFns = {
    getItem,
    setItem,
    removeItem,
} as const;
