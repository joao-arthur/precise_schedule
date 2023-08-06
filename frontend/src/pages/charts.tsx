import { useAuthPage } from "@/features/session/useAuthPage";
import { EventsTable } from "@/content/charts/EventsTable/EventsTable";
import { AllEvents } from "@/content/charts/AllEvents";
import { EventsByCategory } from "@/content/charts/EventsByCategory";
import { Link } from "@/components/atoms/Link";
import { Header } from "@/content/base/header/Header";
import { RoundButton } from "@/components/atoms/extraButton/RoundButton";
import { Icon } from "@/components/atoms/Icon";

export default function Charts() {
    useAuthPage();

    return (
        <>
            <Header
                left={
                    <Link to="/">
                        <div className="flex justify-center">
                            <RoundButton>
                                <Icon name="calendar" size={9} fill="white" className="p-2" />
                            </RoundButton>
                        </div>
                    </Link>
                }
            />
            <main className="flex h-full">
                <div className="flex flex-col flex-1 h-full overflow-x-hidden">
                    <div className="flex-1 block overflow-x-hidden">
                        <div className="h-1/4 overflow-y-hidden">
                            <EventsTable />
                        </div>
                        <div className="h-1/4 overflow-y-hidden">
                            <AllEvents />
                        </div>
                        <div className="h-1/4 overflow-y-hidden">
                            <EventsByCategory />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
