import type { Months } from "frontend_core";
import { useEffect, useState } from "react";
import { dateFns } from "frontend_core";
import { useDevice } from "@/lib/device/useDevice";

export function useMonths() {
    const [months, setMonths] = useState<Months>(
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    );
    const isMobile = useDevice().isMobile();

    useEffect(() => {
        setMonths(
            dateFns.formatMonths(
                window.navigator.language,
                isMobile ? "short" : "long",
            ),
        );
    }, [isMobile]);

    return months;
}
