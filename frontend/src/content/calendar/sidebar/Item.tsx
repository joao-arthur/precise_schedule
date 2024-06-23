import { useState } from "react";
import { useEvent } from "@/features/event/useEvent";
import { TransparentButtonIcon } from "@/components/molecules/TransparentButtonIcon";
import { Text } from "@/components/atoms/Text";
import { InfoEvent } from "@/content/event/InfoEvent";
import { UpdateEvent } from "@/content/event/UpdateEvent";
import { DeleteEvent } from "@/content/event/DeleteEvent";
import { IconEventBuilder } from "@/content/event/IconEventBuilder";

type props = {
    readonly evt: string;
};

export function Item({ evt }: props) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const { events } = useEvent();
    const event = events.find((e) => e.id === evt);

    if (!event) {
        return null;
    }

    return (
        <div className="flex justify-between items-center p-3">
            <div className="flex gap-x-2 items-center">
                <IconEventBuilder event={event} />
                <Text size="lg">
                    {event.name}
                </Text>
            </div>
            <div className="flex gap-2">
                <TransparentButtonIcon
                    color="prm"
                    onClick={() => setIsInfoVisible(true)}
                    icon="info"
                    title="Details"
                />
                {isInfoVisible && event
                    ? <InfoEvent event={event} onClose={() => setIsInfoVisible(false)} />
                    : null}
                <TransparentButtonIcon
                    color="prm"
                    onClick={() => setIsEditVisible(true)}
                    icon="pencil"
                    title="Edit"
                />
                {isEditVisible && event
                    ? <UpdateEvent event={event} onClose={() => setIsEditVisible(false)} />
                    : null}
                <TransparentButtonIcon
                    color="red"
                    onClick={() => setIsDeleteVisible(true)}
                    icon="trash"
                    title="Delete"
                />
                {isDeleteVisible && event
                    ? <DeleteEvent event={event} onCancel={() => setIsDeleteVisible(false)} />
                    : null}
            </div>
        </div>
    );
}
