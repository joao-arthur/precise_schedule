import clss from "classnames";
import { useDevice } from "@/lib/device/useDevice";
import { EventItem } from "./EventItem";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";

type props = {
    readonly date: string;
};

export function Events({ date }: props) {
    const isMobile = useDevice().isMobile();
    const { getDateEvents } = useCalendarEvent();

    return (
        <div
            className={clss("flex-1 m-1", {
                "w-screen": isMobile,
            })}
        >
            {getDateEvents(date).map((evt) => (
                <EventItem
                    key={evt}
                    evt={evt}
                />
            ))}
        </div>
    );
}
