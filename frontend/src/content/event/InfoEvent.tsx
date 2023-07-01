import { useMemo } from "react";
import { dateFns } from "../../../../lib/objects/dateFns";
import { eventType } from "../../eventType";
import { EventRegister } from "./EventRegister";
import { eventModel } from "./eventModel";

function makeModel(event: eventType): eventModel {
    return {
        title: event.name,
        name: { readOnly: true, defaultValue: event.name },
        category: { readOnly: true, defaultValue: event.category },
        repeats: { readOnly: true },
        frequency: { readOnly: true, defaultValue: event.frequency },
        weekendRepeat: {
            readOnly: true,
            defaultValue: event.weekendRepeat,
        },
        startDate: {
            readOnly: true,
            defaultValue: new Date(event.start),
        },
        startTime: {
            readOnly: true,
            defaultValue: dateFns.formatTime(new Date(event.start)),
        },
        endDate: {
            readOnly: true,
            defaultValue: new Date(event.end),
        },
        endTime: {
            readOnly: true,
            defaultValue: dateFns.formatTime(new Date(event.end)),
        },
        browserNotification: {
            readOnly: true,
            defaultValue: event.browserNotification,
        },
        emailNotification: {
            readOnly: true,
            defaultValue: event.emailNotification,
        },
    };
}

type props = {
    readonly visible: boolean;
    readonly hide: () => void;
    readonly event: eventType;
};

export function InfoEvent(
    { visible, hide, event }: props,
) {
    const model = useMemo(() => makeModel(event), [event]);

    return (
        <EventRegister
            visible={visible}
            hide={hide}
            type="INFO"
            model={model}
            onSubmit={() => {}}
        />
    );
}
