import clss from "classnames";
import { useCalendar } from "@/features/calendar/useCalendar";
import { Text } from "@/components/atoms/typography/Text";
import { TextSmall } from "@/components/atoms/typography/TextSmall";
import { DisabledText } from "@/components/atoms/typography/DisabledText";
import { Event } from "@/features/event/event";

type props = {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly events: readonly Event[];
};

export function Cell({ year, month, day, events }: props) {
    const { toggleSelectedDate } = useCalendar();
    const date = new Date(year, month, day);
    const isInMonth = date.getMonth() === month;

    return isInMonth
        ? (
            <div
                className={clss(
                    "flex flex-col flex-1 rounded cursor-pointer",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
            >
                <Text
                    className="select-none text-xl text-center"
                    onClick={() => toggleSelectedDate(date.toISOString())}
                >
                    {date.getDate()}
                </Text>
                {events.map((evt) => <TextSmall key={evt.id}>{evt.name}</TextSmall>)}
            </div>
        )
        : (
            <DisabledText
                onClick={() => toggleSelectedDate(date.toISOString())}
                className={clss(
                    "flex flex-1 rounded cursor-pointer justify-center items-start select-none text-xl",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
            >
                {date.getDate()}
            </DisabledText>
        );
}
