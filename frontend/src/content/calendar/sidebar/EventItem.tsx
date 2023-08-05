import { useState } from "react";
import { useEvent } from "@/features/event/useEvent";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Text } from "@/components/atoms/Text";
import { If } from "@/components/atoms/layout/If";
import { InfoEvent } from "@/content/event/InfoEvent";
import { EditEvent } from "@/content/event/EditEvent";
import { DeleteEvent } from "@/content/event/DeleteEvent";

type props = {
    readonly evt: string;
};

export function EventItem({ evt }: props) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const { eventsMap } = useEvent();
    const event = eventsMap.get(evt)!;

    return (
        <div className="flex justify-between items-center p-3">
            <Text size="lg">
                {event.name}
            </Text>
            <div className="flex gap-2">
                <ButtonIcon
                    name="info"
                    size="medium"
                    onClick={() => setIsInfoVisible(true)}
                />
                <If condition={isInfoVisible}>
                    <InfoEvent
                        event={event}
                        onCancel={() => setIsInfoVisible(false)}
                    />
                </If>
                <ButtonIcon
                    name="pencil"
                    size="medium"
                    onClick={() => setIsEditVisible(true)}
                />
                <If condition={isEditVisible}>
                    <EditEvent
                        event={event}
                        onCancel={() => setIsEditVisible(false)}
                    />
                </If>
                <ButtonIcon
                    name="trash"
                    size="medium"
                    onClick={() => setIsDeleteVisible(true)}
                />
                <If condition={isDeleteVisible}>
                    <DeleteEvent
                        event={event}
                        onCancel={() => setIsDeleteVisible(false)}
                    />
                </If>
            </div>
        </div>
    );
}
