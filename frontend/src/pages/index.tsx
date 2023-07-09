import { useEffect } from "react";
import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { useFindEvent } from "@/features/event/useEventAPI";
import { useSession } from "@/features/session/useSession";

export default function Calendar() {
    const { logged } = useSession();
    const isLogged = logged();
    const { mutate, data } = useFindEvent();

    useEffect(() => {
        if (isLogged) {
            mutate();
        }
    }, [isLogged]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <Table />
            <Sidebar />
        </>
    );
}
