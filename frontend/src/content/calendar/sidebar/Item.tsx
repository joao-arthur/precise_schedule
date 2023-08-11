import { useState } from "react";
import { useEvent } from "@/features/event/useEvent";
import { TransparentButtonIcon } from "@/components/molecules/TransparentButtonIcon";
import { Text } from "@/components/atoms/Text";
import { InfoEvent } from "@/content/event/InfoEvent";
import { UpdateEvent } from "@/content/event/UpdateEvent";
import { DeleteEvent } from "@/content/event/DeleteEvent";

type props = {
    readonly evt: string;
};

export function Item({ evt }: props) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const { events } = useEvent();
    const event = events.find((e) => e.id === evt);

    return (
        <div className="flex justify-between items-center p-3">
            <Text size="lg">
                {event?.name}
            </Text>
            <div className="flex gap-2">
                <TransparentButtonIcon onClick={() => setIsInfoVisible(true)} icon="info" />
                {isInfoVisible && event
                    ? <InfoEvent event={event} onClose={() => setIsInfoVisible(false)} />
                    : null}
                <TransparentButtonIcon onClick={() => setIsEditVisible(true)} icon="pencil" />
                {isEditVisible && event
                    ? <UpdateEvent event={event} onClose={() => setIsEditVisible(false)} />
                    : null}
                <TransparentButtonIcon onClick={() => setIsDeleteVisible(true)} icon="trash" />
                {isDeleteVisible && event
                    ? <DeleteEvent event={event} onCancel={() => setIsDeleteVisible(false)} />
                    : null}
            </div>
        </div>
    );
}
