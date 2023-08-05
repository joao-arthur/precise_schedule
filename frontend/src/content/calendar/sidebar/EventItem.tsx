import { useState } from "react";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Text } from "@/components/atoms/Text";
import { useEvent } from "@/features/event/useEvent";
import { Modal } from "@/components/molecules/Modal";

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
                <Modal
                    title={event.name.toLocaleUpperCase()}
                    visible={isInfoVisible}
                    onCancel={() => {
                        setIsInfoVisible(false);
                    }}
                >
                    <div>
                        <h1>atumalaka</h1>
                    </div>
                </Modal>
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
