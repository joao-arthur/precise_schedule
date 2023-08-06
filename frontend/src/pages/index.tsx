import { num } from "funis";
import { calendarFns } from "frontend_core";
import { cl } from "@/lib/cl";
import { useSession } from "@/features/session/useSession";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useMonths } from "@/features/date/useMonths";
import { Header } from "@/content/base/header/Header";
import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { LoadEvents } from "@/content/calendar/LoadEvents";
import { If } from "@/components/atoms/layout/If";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";
import { Text } from "@/components/atoms/Text";

export default function Calendar() {
    const logged = useSession().logged();
    const { year, month, setCurrentMonth, prev, next } = useCalendar();
    const months = useMonths();

    return (
        <>
            <Header
                left={
                    <>
                        <If condition={logged}>
                            <Link to="/charts">
                                <ButtonIcon name="chart" size="medium" />
                            </Link>
                        </If>
                        <ButtonIcon
                            name="<"
                            size="medium"
                            onClick={() => prev()}
                        />
                        <ButtonIcon
                            name=">"
                            size="medium"
                            onClick={() => next()}
                        />
                        <Text size="2xl">{year} {months[month - 1]}</Text>
                        <If condition={!calendarFns.isCurrent({ year, month })}>
                            <button
                                className={cl(
                                    "h-10 px-1 rounded",
                                    "transition-colors hover:duration-200 duration-300",
                                    "text-gray-800 bg-white",
                                    "border mx-1 text-lg",
                                    "hover:bg-pastel-gray active:bg-pastel-gray border-gray-300",
                                    "dark:text-pastel-gray dark:bg-dark-light dark:hover:bg-dark dark:active:bg-dark dark:border-gray-500",
                                )}
                                onClick={() => setCurrentMonth()}
                            >
                                Now
                            </button>
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
