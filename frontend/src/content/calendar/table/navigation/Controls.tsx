import { num } from "funis";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useMonths } from "@/features/date/useMonths";
import { NavigationSelect } from "./NavigationSelect";

export function Controls() {
    const { year, month, setYear, setMonth } = useCalendar();
    const months = useMonths();
    const options = num.range(year - 2, year + 2);

    return (
        <>
            <NavigationSelect
                type="select"
                options={months}
                name="month"
                value={months[month - 1]}
                onChange={(newMonth) => setMonth(months.indexOf(newMonth) + 1)}
            />
            <NavigationSelect
                type="select"
                options={options.map(String)}
                name="month"
                value={String(year)}
                onChange={(newYear) => setYear(Number(newYear))}
            />
        </>
    );
}
