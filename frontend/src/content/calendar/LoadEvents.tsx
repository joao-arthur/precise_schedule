import { useEffect } from "react";
import { useFindEvents } from "@/features/event/useEventAPI";
import { useEvent } from "@/features/event/useEvent";

export function LoadEvents() {
    const { data } = useFindEvents();
    const { setEvents } = useEvent();

    useEffect(() => {
        if (data) {
            setEvents(data);
        }
    }, [data]);

    return null;
}
