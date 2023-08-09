import { useState } from "react";
import { dateFns } from "frontend_core";
import { cl } from "@/lib/cl";
import { useDevice } from "@/lib/device/useDevice";
import { useSession } from "@/features/session/useSession";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/button/Button";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";
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

    return (
        <div className={cl("flex flex-col flex-1", isMobile ? "w-screen" : "w-100")}>
            <div
                className={cl(
                    "flex justify-between items-center",
                    "px-5 py-4",
                    "border-b border-gray-300 dark:border-gray-500",
                    "transition-colors duration-100",
                )}
            >
                <div className="text-center">
                    <Text size="3xl">
                        {dateFns.formatDate(date, window.navigator.language)}
                    </Text>
                </div>
                <ButtonIcon icon="x" size="big" onClick={close} />
            </div>
            <div className={cl("flex-1 m-1", { "w-screen": isMobile })}>
                {getDateEvents(date).map((evt) => <Item key={evt} evt={evt} />)}
            </div>
            <If condition={logged}>
                <div className="p-4 border-t border-gray-300 dark:border-gray-500">
                    <Button onClick={() => setVisible(true)}>NEW EVENT</Button>
                    <CreateEventModal visible={visible} onClose={() => setVisible(false)} />
                </div>
            </If>
        </div>
    );
}
