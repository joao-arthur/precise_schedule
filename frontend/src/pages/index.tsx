import { useEffect } from "react";
import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { useFindEvents } from "@/features/event/useEventAPI";
import { useSession } from "@/features/session/useSession";
import { useEvent } from "@/features/event/useEvent";

export default function Calendar() {
    const { logged } = useSession();
    const isLogged = logged();
    const { mutate, data } = useFindEvents();
    const { setEvents } = useEvent();

    useEffect(() => {
        if (isLogged) {
            mutate();
        }
    }, [isLogged]);

    useEffect(() => {
        if (data) {
            setEvents(data);
        }
    }, [data]);

    return (
        <>
            <Table />
            <Sidebar />
        </>
    );
}
