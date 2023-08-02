import type { Calendar } from "frontend_core";
import clss from "classnames";
import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { DisabledText } from "@/components/atoms/typography/DisabledText";
import { Event } from "@/features/event/event";
import { Text2 } from "@/components/atoms/typography/Text2";

type props = {
    readonly calendar: Calendar;
    readonly date: string;
    readonly events: readonly Event["id"][];
};

export function Cell({ calendar, date, events }: props) {
    const { toggleSelectedDate } = useCalendar();

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
                            <Text2 size="xl">
                                {date}
                            </Text2>
                        </div>
                        {events.map((evt) => <Text2 size="xs" key={evt}>{evt}</Text2>)}
                    </>
                )
                : (
                    <div className="text-center">
                        <Text2 size="xl" disabled>
                            {date}
                        </Text2>
                    </div>
                )}
        </div>
    );
}
