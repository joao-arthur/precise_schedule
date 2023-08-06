import type { WeekDays } from "frontend_core";
import { useEffect, useState } from "react";
import { dateFns } from "frontend_core";
import { useDevice } from "@/lib/device/useDevice";

export function useWeekDays() {
    const [weekDays, setWeekDays] = useState<WeekDays>(["1", "2", "3", "4", "5", "6", "7"]);
    const isMobile = useDevice().isMobile();

    useEffect(() => {
        setWeekDays(
            dateFns.formatWeekDays(
                window.navigator.language,
                isMobile ? "short" : "long",
            ),
        );
    }, [isMobile]);

    return weekDays;
}
