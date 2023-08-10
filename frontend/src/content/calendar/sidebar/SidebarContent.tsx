import { useState } from "react";
import { cl } from "@/lib/cl";
import { useDevice } from "@/lib/device/useDevice";
import { useSession } from "@/features/session/useSession";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { useFormatDate } from "@/features/date/useFormatDate";
import { Text } from "@/components/atoms/Text";
import { TransparentButtonIcon } from "@/components/molecules/TransparentButtonIcon";
import { If } from "@/components/atoms/layout/If";
import { CreateEventModal } from "@/content/event/CreateEventModal";
import { Item } from "./Item";

type props = {
    readonly date: string;
    readonly close: () => void;
};

export function SidebarContent({ date, close }: props) {
    const isMobile = useDevice().isMobile();
    const [visible, setVisible] = useState(false);
    const { getDateEvents } = useCalendarEvent();
    const logged = useSession().logged();
    const formatDate = useFormatDate();

    return (
        <div
            className={cl(
                "flex flex-col flex-1 h-full",
                isMobile ? "w-screen" : "w-100",
            )}
        >
            <div
                className={cl(
                    "flex justify-between items-center",
                    "px-5 py-4",
                    "transition-colors duration-100",
                )}
            >
                <div className="text-center">
                    <Text size="3xl">
                        {formatDate(date)}
                    </Text>
                </div>
                <div className="flex">
                    <If condition={logged}>
                        <TransparentButtonIcon
                            onClick={() => setVisible(true)}
                            title="Add event"
                            icon="calendar-plus"
                            color="prm"
                            size={9}
                        />
                    </If>
                    <TransparentButtonIcon onClick={close} icon="x" size={9} />
                </div>
            </div>
            <div className={cl("flex-1 m-1 overflow-auto", { "w-screen": isMobile })}>
                {getDateEvents(date).map((evt) => <Item key={evt} evt={evt} />)}
            </div>
            <CreateEventModal date={date} visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
}
