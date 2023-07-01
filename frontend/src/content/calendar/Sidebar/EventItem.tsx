import { useState } from "react";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Text } from "@/components/atoms/typography/Text";
//import { InfoEvent } from "../../EventRegister/InfoEvent";
//import { EditEvent } from "../../EventRegister/EditEvent";
import { Event } from "@/features/event/event";
//import { DeleteEvent } from "../../EventRegister/DeleteEvent";

type props = {
    readonly event: Event;
};

export function EventItem({ event }: props) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);

    return (
        <div className="flex justify-between items-center p-3">
            <Text className="text-lg text-ellipsis whitespace-nowrap overflow-hidden">
                {event.name}
            </Text>
            <div className="flex">
                <ButtonIcon
                    name="info"
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
                    name="edit"
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
