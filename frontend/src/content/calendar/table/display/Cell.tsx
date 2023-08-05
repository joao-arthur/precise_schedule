import type { Calendar } from "frontend_core";
import { cl } from "@/lib/cl";
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

    if (calendarFns.isDateIn(calendar, date)) {
        return (
            <div
                className={cl(
                    "flex flex-col flex-1 rounded cursor-pointer overflow-hidden",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
                onClick={() => toggleSelectedDate(date)}
            >
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
            </div>
        );
    }
    return (
        <div
            className={cl(
                "flex flex-col flex-1 overflow-hidden text-center bg-gray-100 dark:bg-dark-lightless",
                "transition-colors duration-500",
            )}
        >
            <Text size="xl" disabled>
                {dateFns.formatDay(date)}
            </Text>
        </div>
    );
}
