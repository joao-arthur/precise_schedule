import { useCallback, useEffect, useState } from "react";
import { dateFns } from "frontend_core";

export function useFormatDate() {
    const [language, setLanguage] = useState<string | undefined>(undefined);

    useEffect(() => {
        setLanguage(window.navigator.language);
    }, []);

    const fmt = useCallback(
        (date: string) => language ? dateFns.formatDate(date, language) : "",
        [language],
    );

    return { fmt };
}
