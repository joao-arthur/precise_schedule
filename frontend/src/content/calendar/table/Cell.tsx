import type { Calendar } from "frontend_core";
import { calendarFns, dateFns } from "frontend_core";
import { cl } from "@/lib/cl";
import { useCalendar } from "@/features/calendar/useCalendar";
import { Event } from "@/features/event/event";
import { useEvent } from "@/features/event/useEvent";
import { Text } from "@/components/atoms/Text";

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
                    "w-full h-full",
                    "flex flex-col flex-1",
                    "rounded cursor-pointer overflow-hidden",
                    "hover:bg-prm-lg2 active:bg-prm-lg",
                    "dark:hover:bg-prm-dk2 dark:active:bg-prm-dk",
                )}
                onClick={() => toggleSelectedDate(date)}
            >
                <div className="text-center">
                    <Text size="xl">
                        {dateFns.formatDay(date)}
                    </Text>
                </div>
                <div className="flex flex-col gap-1">
                    {events.map((evt) => (
                        <div key={evt}>
                            <Text size="xs">
                                {eventsMap.get(evt)?.name}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div
            className={cl(
                "w-full h-full",
                "flex flex-col flex-1",
                "overflow-hidden text-center bg-gray-100 dark:bg-dark-lightless",
                "transition-colors duration-300",
            )}
        >
            <Text size="xl" disabled>
                {dateFns.formatDay(date)}
            </Text>
        </div>
    );
}
