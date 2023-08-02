import type { Calendar } from "frontend_core";
import clss from "classnames";
import { useCalendar } from "@/features/calendar/useCalendar";
import { Text } from "@/components/atoms/typography/Text";
import { TextSmall } from "@/components/atoms/typography/TextSmall";
import { DisabledText } from "@/components/atoms/typography/DisabledText";
import { Event } from "@/features/event/event";
import { calendarFns } from "frontend_core";

type props = {
    readonly calendar: Calendar;
    readonly date: string;
    readonly events: readonly Event["id"][];
};

export function Cell({ calendar, date, events }: props) {
    const { toggleSelectedDate } = useCalendar();

    return calendarFns.isDateIn(calendar, date)
        ? (
            <div
                className={clss(
                    "flex flex-col flex-1 rounded cursor-pointer",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
                onClick={() => toggleSelectedDate(date)}
            >
                <Text className="select-none text-xl text-center">
                    {date}
                </Text>
                {events.map((evt) => <TextSmall key={evt}>{evt}</TextSmall>)}
            </div>
        )
        : (
            <DisabledText
                onClick={() => toggleSelectedDate(date)}
                className={clss(
                    "flex flex-1 rounded cursor-pointer justify-center items-start select-none text-xl",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
            >
                {date}
            </DisabledText>
        );
}
