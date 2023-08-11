import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useFormatMonth } from "@/features/date/useFormatMonth";
import { Text } from "@/components/atoms/Text";
import { HoverButton } from "@/components/atoms/extraButton/HoverButton";
import { RoundButtonIcon } from "@/components/molecules/RoundButtonIcon";
import { Header } from "@/content/base/Header";
import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";

export default function Calendar() {
    const { year, month, setCurrentMonth, prev, next } = useCalendar();
    const { fmt } = useFormatMonth();

    return (
        <>
            <Header
                left={
                    <>
                        <div className="flex justify-center gap-1">
                            <RoundButtonIcon
                                onClick={prev}
                                title="Previous month"
                                icon="<"
                                color="white"
                            />
                            <RoundButtonIcon
                                onClick={next}
                                title="Next month"
                                icon=">"
                                color="white"
                            />
                        </div>
                        <Text size="2xl" color="white">
                            <div className="capitalize">
                                {year} {fmt(month)}
                            </div>
                        </Text>
                        {!calendarFns.isCurrent({ year, month })
                            ? <HoverButton onClick={setCurrentMonth}>Today</HoverButton>
                            : null}
                    </>
                }
            />
            <main className="flex h-full overflow-hidden">
                <Table />
                <Sidebar />
            </main>
        </>
    );
}
