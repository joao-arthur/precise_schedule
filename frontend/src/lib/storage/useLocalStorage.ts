import { useCallback } from "react";
import { localStorageFns } from "./localStorageFns";

type LocalStorage<T> = {
    readonly getItem: () => T | undefined;
    readonly setItem: (value: T) => void;
    readonly removeItem: () => void;
};

export function useLocalStorage<T>(key: string): LocalStorage<T> {
    const getItem = useCallback(
        () => localStorageFns.getItem<T>(key),
        [],
    );
    const setItem = useCallback(
        (value: T) => localStorageFns.setItem<T>(key, value),
        [],
    );
    const removeItem = useCallback(
        () => localStorageFns.removeItem(key),
        [],
    );

    return { getItem, setItem, removeItem };
}
