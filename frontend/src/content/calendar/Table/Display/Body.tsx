import { useCalendar } from "@/features/calendar/useCalendar";
import { generateTable } from "@/features/calendar/generateTable";
import { Cell } from "./Cell";

export function Body() {
    const { year, month } = useCalendar();

    return (
        <>
            {generateTable({ year, month }).map((week, weekIndex) => (
                <div className="flex flex-1" key={weekIndex}>
                    {week.map((day) => (
                        <Cell
                            year={year}
                            month={month}
                            day={day}
                            key={day}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
