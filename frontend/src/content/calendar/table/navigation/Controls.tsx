import { num } from "funis";
import { NavigationSelect } from "./NavigationSelect";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useDevice } from "@/lib/device/useDevice";

const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const monthsOfYearAbbrev = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function Controls() {
    const device = useDevice();
    const isMobile = device.isMobile();

    const {
        year,
        month,
        setYear,
        setMonth,
    } = useCalendar();

    const months = isMobile ? monthsOfYearAbbrev : monthsOfYear;
    const options = num.range(year - 2, year + 2);

    return (
        <>
            <NavigationSelect
                type="select"
                options={months}
                name="month"
                value={months[month]}
                onChange={(newMonth) =>
                    setMonth(months.indexOf(newMonth))}
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
