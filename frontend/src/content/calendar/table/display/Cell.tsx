import type { Calendar } from "frontend_core";
import clss from "classnames";
import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { TextBig } from "@/components/atoms/typography/TextBig";
import { TextSmall } from "@/components/atoms/typography/TextSmall";
import { DisabledText } from "@/components/atoms/typography/DisabledText";
import { Event } from "@/features/event/event";

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
                            <TextBig>
                                {date}
                            </TextBig>
                        </div>
                        {events.map((evt) => <TextSmall key={evt}>{evt}</TextSmall>)}
                    </>
                )
                : (
                    <DisabledText
                        className={clss(
                            "text-xl text-center",
                        )}
                    >
                        {date}
                    </DisabledText>
                )}
        </div>
    );
}
