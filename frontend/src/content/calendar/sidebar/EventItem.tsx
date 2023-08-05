import { useState } from "react";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Text } from "@/components/atoms/Text";
//import { InfoEvent } from "../../EventRegister/InfoEvent";
//import { EditEvent } from "../../EventRegister/EditEvent";
import { Event } from "@/features/event/event";
import { useEvent } from "@/features/event/useEvent";
//import { DeleteEvent } from "../../EventRegister/DeleteEvent";

type props = {
    readonly evt: string;
};

export function EventItem({ evt }: props) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const { eventsMap } = useEvent();

    return (
        <div className="flex justify-between items-center p-3">
            <Text size="lg">
                {eventsMap.get(evt)?.name}
            </Text>
            <div className="flex gap-2">
                <ButtonIcon
                    name="info"
                    size="medium"
                    onClick={() => setIsInfoVisible(true)}
                />
                {
                    /*<InfoEvent
                    visible={isInfoVisible}
                    hide={() => setIsInfoVisible(false)}
                    event={event}
    />*/
                }
                <ButtonIcon
                    name="pencil"
                    size="medium"
                    onClick={() => setIsEditVisible(true)}
                />
                {
                    /*isEditVisible
                    ? (
                        <EditEvent
                            visible={isEditVisible}
                            hide={() => setIsEditVisible(false)}
                            event={event}
                        />
                    )
                    : null*/
                }
                <ButtonIcon
                    name="trash"
                    size="medium"
                    onClick={() => setIsDeleteVisible(true)}
                />
                {
                    /*isDeleteVisible
                    ? (
                        <DeleteEvent
                            visible={isDeleteVisible}
                            hide={() => setIsDeleteVisible(false)}
                            event={event}
                        />
                    )
                    : null*/
                }
            </div>
        </div>
    );
}
