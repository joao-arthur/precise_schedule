import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { dateFns } from "../../../../lib/objects/dateFns";
import { eventType } from "../../eventType";
import { useEventAPI } from "../../eventAPI";
import { EventRegister } from "./EventRegister";
import { eventModel } from "./eventModel";

function makeModel(event: eventType): eventModel {
    return {
        title: `Edit "${event.name}"`,
        name: { readOnly: true, defaultValue: event.name },
        category: { readOnly: true, defaultValue: event.category },
        importance: {
            readOnly: false,
            defaultValue: event.importance,
        },
        repeats: { readOnly: false },
        frequency: { readOnly: false, defaultValue: event.frequency },
        weekendRepeat: {
            readOnly: false,
            defaultValue: event.weekendRepeat,
        },
        startDate: {
            readOnly: false,
            defaultValue: new Date(event.start),
        },
        startTime: {
            readOnly: false,
            defaultValue: dateFns.formatTime(new Date(event.start)),
        },
        endDate: {
            readOnly: false,
            defaultValue: new Date(event.end),
        },
        endTime: {
            readOnly: false,
            defaultValue: dateFns.formatTime(new Date(event.end)),
        },
        browserNotification: {
            readOnly: false,
            defaultValue: event.browserNotification,
        },
        emailNotification: {
            readOnly: false,
            defaultValue: event.emailNotification,
        },
    };
}

type props = {
    readonly visible: boolean;
    readonly hide: () => void;
    readonly event: eventType;
};

export function EditEvent(
    { visible, hide, event }: props,
) {
    const [editedEvent, setEvent] = useState<eventType>();
    const { useUpdateEvent } = useEventAPI();
    const { mutate, isSuccess } = useUpdateEvent(
        editedEvent as eventType,
    );
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editedEvent) mutate();
    }, [mutate, editedEvent]);

    useEffect(() => {
        if (isSuccess) {
            hide();
            queryClient.invalidateQueries("getEvents");
        }
    }, [queryClient, isSuccess, hide]);

    const model = useMemo(() => makeModel(event), [event]);

    return (
        <EventRegister
            visible={visible}
            hide={hide}
            type="EDIT"
            model={model}
            onSubmit={(editedEvent) =>
                setEvent({ ...editedEvent, id: event.id })}
        />
    );
}
