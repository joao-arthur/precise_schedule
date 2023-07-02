import type { CreateEvent, Event, UpdateEvent } from "./event";
import { useMutation } from "react-query";
import { useAppRequest } from "@/lib/request/useAppRequest";

export function useEventAPI() {
    const request = useAppRequest();

    function create() {
        return useMutation(
            "event/create",
            (event: CreateEvent) =>
                request.post("event", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function update(id: Event["id"]) {
        return useMutation(
            "event/update",
            (event: UpdateEvent) =>
                request.put(`event/${id}`, event, {
                    loading: `Saving "${event.name}"...`,
                    error: `"${event.name}" could not be edited!`,
                    success: `"${event.name}" edited!`,
                }),
        );
    }

    function find() {
        return useMutation(
            "event/find",
            () => request.get<readonly Event[]>("event"),
        );
    }

    function remove() {
        return useMutation(
            "event/remove",
            (id: Event["id"]) =>
                request.delete(`event/${id}`, {
                    loading: `Deleting event...`,
                    error: `The event could not be deleted!`,
                    success: `Event deleted!`,
                }),
        );
    }

    return {
        create,
        update,
        find,
        remove,
    };
}
