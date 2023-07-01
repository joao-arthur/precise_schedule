import { localStorageFns } from "@/lib/storage/localStorageFns";

export type Theme = "light" | "dark";

const KEY = "theme";

function get(): Theme {
    const savedTheme = localStorageFns.getItem<Theme>(KEY);
    return savedTheme || getBrowserTheme();
}

function getBrowserTheme(): Theme {
    return globalThis.matchMedia("(prefers-color-scheme: dark)")
            .matches
        ? "dark"
        : "light";
}

function apply(theme: Theme) {
    switch (theme) {
        case "dark":
            return document.documentElement.classList.add("dark");
        case "light":
            return document.documentElement.classList.remove("dark");
    }
}

function set(theme: Theme): void {
    localStorageFns.setItem(KEY, theme);
    apply(theme);
}

function init(): void {
    const savedTheme = localStorageFns.getItem<Theme>(KEY);
    if (savedTheme) {
        apply(savedTheme);
        return;
    }
    set(getBrowserTheme());
}

export const theme = {
    get,
    set,
    init,
};
