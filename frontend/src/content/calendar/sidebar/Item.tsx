import { useState } from "react";
import { useEvent } from "@/features/event/useEvent";
import { TransparentButtonIcon } from "@/components/molecules/TransparentButtonIcon";
import { Text } from "@/components/atoms/Text";
import { If } from "@/components/atoms/layout/If";
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
    const { eventsMap } = useEvent();
    const event = eventsMap.get(evt)!;

    return (
        <div className="flex justify-between items-center p-3">
            <Text size="lg">
                {event.name}
            </Text>
            <div className="flex gap-2">
                <TransparentButtonIcon
                    onClick={() => setIsInfoVisible(true)}
                    icon="info"
                    color="gray"
                />
                <If condition={isInfoVisible}>
                    <InfoEvent event={event} onClose={() => setIsInfoVisible(false)} />
                </If>
                <TransparentButtonIcon
                    onClick={() => setIsEditVisible(true)}
                    icon="pencil"
                    color="gray"
                />
                <If condition={isEditVisible}>
                    <UpdateEvent event={event} onClose={() => setIsEditVisible(false)} />
                </If>
                <TransparentButtonIcon
                    onClick={() => setIsDeleteVisible(true)}
                    icon="trash"
                    color="gray"
                />
                <If condition={isDeleteVisible}>
                    <DeleteEvent event={event} onCancel={() => setIsDeleteVisible(false)} />
                </If>
            </div>
        </div>
    );
}
