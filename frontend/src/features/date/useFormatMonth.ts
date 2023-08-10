import { useCallback, useEffect, useState } from "react";
import { dateFns } from "frontend_core";

export function useFormatMonth() {
    const [language, setLanguage] = useState<string | undefined>(undefined);

    useEffect(() => {
        setLanguage(window.navigator.language);
    }, []);

    const fmt = useCallback(
        (month: number) => language ? dateFns.formatMonth(month, language, "short") : "",
        [language],
    );

    return fmt;
}
