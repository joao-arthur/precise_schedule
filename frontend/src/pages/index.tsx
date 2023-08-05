import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { useSession } from "@/features/session/useSession";
import { LoadEvents } from "@/content/calendar/LoadEvents";

export default function Calendar() {
    const logged = useSession().logged();

    return (
        <>
            <Table />
            <Sidebar />
            {logged ? <LoadEvents /> : null}
        </>
    );
}
