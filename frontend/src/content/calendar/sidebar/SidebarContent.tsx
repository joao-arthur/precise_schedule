import { useState } from "react";
import { cl } from "@/lib/cl";
import { useDevice } from "@/lib/device/useDevice";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { useFormatDate } from "@/features/date/useFormatDate";
import { Text } from "@/components/atoms/Text";
import { TransparentButtonIcon } from "@/components/molecules/TransparentButtonIcon";
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
    const { fmt } = useFormatDate();

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
                    "border-b border-gray-300 dark:border-gray-500",
                    "transition-colors duration-100",
                )}
            >
                <div className="text-center">
                    <Text bold size="3xl" color="prm">
                        {fmt(date)}
                    </Text>
                </div>
                <div className="flex">
                    <TransparentButtonIcon
                        onClick={() => setVisible(true)}
                        title="Add event"
                        icon="calendar-plus"
                        color="prm"
                        size={9}
                    />
                    <TransparentButtonIcon
                        onClick={close}
                        title="Close sidebar"
                        icon="x"
                        size={9}
                        color="red"
                    />
                </div>
            </div>
            <div className={cl("flex-1 m-1 overflow-auto", { "w-screen": isMobile })}>
                {getDateEvents(date).map((evt) => <Item key={evt} evt={evt} />)}
            </div>
            <CreateEventModal date={date} visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
}
