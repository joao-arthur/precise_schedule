import { useMutation, useQuery } from "react-query";
import { useRequest } from "../../lib/request/useRequest";
import { eventType } from "./eventType";

export function useEventAPI() {
    const { getRequest, postRequest, patchRequest, deleteRequest } =
        useRequest();

    function useGetEvents() {
        return useQuery(
            "getEvents",
            () => getRequest<eventType[]>("event"),
        );
    }

    function useCreateEvent(event: Omit<eventType, "id">) {
        return useMutation(
            "createEvent",
            () =>
                postRequest("event", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function useUpdateEvent(event: eventType) {
        return useMutation(
            "updateEvent",
            () =>
                patchRequest("event/" + event.id, event, {
                    loading: `Editing "${event.name}"...`,
                    error: `"${event.name}" could not be edited!`,
                    success: `"${event.name}" edited!`,
                }),
        );
    }

    function useDeleteEvent(event: eventType) {
        return useMutation(
            ["deleteEvent", event.id],
            () =>
                deleteRequest("event/" + event.id, {
                    loading: `Deleting "${event.name}"...`,
                    error: `"${event.name}" could not be deleted!`,
                    success: `"${event.name}" deleted!`,
                }),
        );
    }

    return {
        useGetEvents,
        useCreateEvent,
        useUpdateEvent,
        useDeleteEvent,
    };
}
