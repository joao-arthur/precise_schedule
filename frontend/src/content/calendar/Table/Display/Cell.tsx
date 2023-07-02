import clss from "classnames";
import { useCalendar } from "@/features/calendar/useCalendar";
import { Text } from "@/components/atoms/typography/Text";
import { DisabledText } from "@/components/atoms/typography/DisabledText";

type props = {
    readonly year: number;
    readonly month: number;
    readonly day: number;
};

export function Cell({ year, month, day }: props) {
    const { toggleSelectedDate } = useCalendar();
    const date = new Date(year, month, day);
    const isInMonth = date.getMonth() === month;

    return isInMonth
        ? (
            <Text
                onClick={() => toggleSelectedDate(date.toISOString())}
                className={clss(
                    "flex flex-1 rounded cursor-pointer justify-center items-center select-none text-xl",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
            >
                {date.getDate()}
            </Text>
        )
        : (
            <DisabledText
                onClick={() => toggleSelectedDate(date.toISOString())}
                className={clss(
                    "flex flex-1 rounded cursor-pointer justify-center items-center select-none text-xl",
                    "hover:bg-primary-lighter active:bg-primary-light",
                    "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                )}
            >
                {date.getDate()}
            </DisabledText>
        );
}
