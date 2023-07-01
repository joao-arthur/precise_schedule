import { useCallback, useEffect } from "react";
import { useState } from "react";
import { theme } from "./theme";

export function useTheme() {
    const [themeValue, setThemeValue] = useState("light");

    useEffect(() => {
        setThemeValue(theme.get());
    }, []);

    const onChangeTheme = useCallback(() => {
        const newTheme = themeValue === "dark" ? "light" : "dark";
        theme.set(newTheme);
        setThemeValue(newTheme);
    }, [themeValue]);

    return [themeValue, onChangeTheme] as const;
}
