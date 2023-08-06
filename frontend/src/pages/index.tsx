import { Table } from "@/content/calendar/table/Table";
import { Sidebar } from "@/content/calendar/sidebar/Sidebar";
import { useSession } from "@/features/session/useSession";
import { LoadEvents } from "@/content/calendar/LoadEvents";
import { Header } from "@/content/base/header/Header";
import { If } from "@/components/atoms/layout/If";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";

export default function Calendar() {
    const logged = useSession().logged();

    return (
        <>
            <Header
                left={
                    <If condition={logged}>
                        <Link to="/charts">
                            <ButtonIcon name="chart" size="medium" />
                        </Link>
                    </If>
                }
            />
            <main className="h-full">
                <Table />
                <Sidebar />
                {logged ? <LoadEvents /> : null}
            </main>
        </>
    );
}
