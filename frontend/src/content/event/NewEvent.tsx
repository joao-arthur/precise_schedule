import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { eventType } from "../../eventType";
import { useEventAPI } from "../../eventAPI";
import { EventRegister } from "./EventRegister";
import { eventModel } from "./eventModel";

function makeModel(day: Date): eventModel {
    return {
        title: "New event on " + day.toLocaleDateString(),
        name: { readOnly: false, defaultValue: "" },
        category: { readOnly: false, defaultValue: "APPOINTMENT" },
        repeats: { readOnly: false },
        frequency: { readOnly: false, defaultValue: "NEVER" },
        weekendRepeat: { readOnly: false, defaultValue: false },
        startDate: { readOnly: false, defaultValue: day },
        startTime: { readOnly: false, defaultValue: "00:00" },
        endDate: { readOnly: false, defaultValue: day },
        endTime: { readOnly: false, defaultValue: "23:59" },
        browserNotification: { readOnly: false, defaultValue: false },
        emailNotification: { readOnly: false, defaultValue: false },
    };
}

type props = {
    readonly visible: boolean;
    readonly hide: () => void;
    readonly day: Date;
};

export function NewEvent(
    { visible, hide, day }: props,
) {
    const [event, setEvent] = useState<Omit<eventType, "id">>();
    const { useCreateEvent } = useEventAPI();
    const { mutate, isSuccess } = useCreateEvent(event as eventType);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (event) mutate();
    }, [mutate, event]);

    useEffect(() => {
        if (isSuccess) {
            hide();
            queryClient.invalidateQueries("getEvents");
        }
    }, [queryClient, isSuccess, hide]);

    const model = useMemo(() => makeModel(day), [day]);

    return (
        <EventRegister
            visible={visible}
            hide={hide}
            type="NEW"
            model={model}
            onSubmit={setEvent}
        />
    );
}
