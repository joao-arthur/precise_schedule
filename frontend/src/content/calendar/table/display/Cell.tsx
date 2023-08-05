import type { Calendar } from "frontend_core";
import clss from "classnames";
import { calendarFns, dateFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { Event } from "@/features/event/event";
import { Text } from "@/components/atoms/Text";
import { useEvent } from "@/features/event/useEvent";

type props = {
    readonly calendar: Calendar;
    readonly date: string;
    readonly events: readonly Event["id"][];
};

export function Cell({ calendar, date, events }: props) {
    const { toggleSelectedDate } = useCalendar();
    const { eventsMap } = useEvent();

    return (
        <div
            className={clss(
                "flex flex-col flex-1 rounded cursor-pointer",
                "hover:bg-primary-lighter active:bg-primary-light",
                "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                "overflow-hidden",
            )}
            onClick={() => toggleSelectedDate(date)}
        >
            {calendarFns.isDateIn(calendar, date)
                ? (
                    <>
                        <div className="text-center">
                            <Text size="xl">
                                {dateFns.formatDay(date)}
                            </Text>
                        </div>
                        {events.map((evt) => (
                            <Text size="xs" key={evt}>
                                {eventsMap.get(evt)?.name}
                            </Text>
                        ))}
                    </>
                )
                : (
                    <div className="text-center">
                        <Text size="xl" disabled>
                            {dateFns.formatDay(date)}
                        </Text>
                    </div>
                )}
        </div>
    );
}
