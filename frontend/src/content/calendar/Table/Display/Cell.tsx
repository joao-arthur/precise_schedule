import clss from "classnames";
import { Text } from "@/components/atoms/typography/Text";
import { useCalendar } from "@/features/calendar/useCalendar";

type props = {
    readonly year: number;
    readonly month: number;
    readonly day: number;
};

export function Cell({ year, month, day }: props) {
    const { toggleSelectedDate } = useCalendar();

    const date = new Date(year, month, day);
    const isInMonth = date.getMonth() === month;

    return (
        <Text
            onClick={() => toggleSelectedDate(date.toISOString())}
            className={clss(
                "flex flex-1 rounded cursor-pointer justify-center items-center select-none text-xl active:text-2xl transition-all duration-75",
                "hover:bg-primary-lighter active:bg-primary-light",
                "dark:hover:bg-primary-darker dark:active:bg-primary-dark",
                {
                    "text-gray-500": !isInMonth,
                },
            )}
            disabled={!isInMonth}
        >
            {date.getDate()}
        </Text>
    );
}
