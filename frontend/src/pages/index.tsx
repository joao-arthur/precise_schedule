import { calendarFns } from "frontend_core";
import { useSession } from "@/features/session/useSession";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useMonths } from "@/features/date/useMonths";
import { If } from "@/components/atoms/layout/If";
import { Text } from "@/components/atoms/Text";
import { RoundButton } from "@/components/atoms/extraButton/RoundButton";
import { Icon } from "@/components/atoms/Icon";
import { HoverButton } from "@/components/atoms/extraButton/HoverButton";
import { Header } from "@/content/base/Header";
import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { LoadEvents } from "@/content/calendar/LoadEvents";

export default function Calendar() {
    const logged = useSession().logged();
    const { year, month, setCurrentMonth, prev, next } = useCalendar();
    const months = useMonths();

    return (
        <>
            <Header
                left={
                    <>
                        <div className="flex justify-center gap-1">
                            <RoundButton onClick={() => prev()}>
                                <Icon name="<" size={9} fill="white" className="p-2" />
                            </RoundButton>
                            <RoundButton onClick={() => next()}>
                                <Icon name=">" size={9} fill="white" className="p-2" />
                            </RoundButton>
                        </div>
                        <Text size="2xl" color="white">{year} {months[month - 1]}</Text>
                        <If condition={!calendarFns.isCurrent({ year, month })}>
                            <HoverButton onClick={() => setCurrentMonth()}>Today</HoverButton>
                        </If>
                    </>
                }
            />
            <main className="flex h-full">
                <Table />
                <Sidebar />
                {logged ? <LoadEvents /> : null}
            </main>
        </>
    );
}
