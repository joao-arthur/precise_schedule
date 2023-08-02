import clss from "classnames";
import { Event } from "@/features/event/event";
import { useDevice } from "@/lib/device/useDevice";
import { EventItem } from "./EventItem";

type props = {
    readonly date: string;
};

export function Events({ date }: props) {
    const device = useDevice();
    const isMobile = device.isMobile();

    const dayEvents: Event[] = []; // useGetDayEvents(day);

    return (
        <div
            className={clss("flex-1 m-1", {
                "w-screen": isMobile,
            })}
        >
            {dayEvents.map((event) => <EventItem event={event} key={event.id} />)}
        </div>
    );
}
