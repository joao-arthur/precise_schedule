import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { useSession } from "@/features/session/useSession";
import { LoadEvents } from "@/content/calendar/LoadEvents";
import { Header } from "@/content/base/header/Header";

export default function Calendar() {
    const logged = useSession().logged();

    return (
        <>
            <Header />
            <main className="flex h-full">
                <Table />
                <Sidebar />
                {logged ? <LoadEvents /> : null}
            </main>
        </>
    );
}
