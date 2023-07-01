import classNames from "classnames";
//import { useGetDayEvents } from "../../../Fns/getDayEvents";
import { Event } from "@/features/event/event";
import { useDevice } from "@/lib/device/useDevice";
import { EventItem } from "./EventItem";

type props = {
    readonly day: Date;
};

export function Events({ day }: props) {
    const device = useDevice();
    const isMobile = device.isMobile();

    const dayEvents: Event[] = []; // useGetDayEvents(day);

    return (
        <div
            className={classNames("flex-1 m-1", {
                "w-screen": isMobile,
            })}
        >
            {dayEvents.map((event) => (
                <EventItem event={event} key={event.id} />
            ))}
        </div>
    );
}
