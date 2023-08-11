import type { Appointment, Birthday, Date, Event, Meeting, Party } from "frontend_core";
import { useMutation, useQuery } from "react-query";
import { useAppRequest } from "@/lib/request/useAppRequest";

export function useCreateAppointment() {
    const request = useAppRequest();
    return useMutation(
        "event/create/APPOINTMENT",
        (event: Appointment) =>
            request.post("event/APPOINTMENT", event, {
                loading: `Registering "${event.name}"...`,
                success: `"${event.name}" registered!`,
            }),
    );
}

export function useCreateBirthday() {
    const request = useAppRequest();
    return useMutation(
        "event/create/BIRTHDAY",
        (event: Birthday) =>
            request.post("event/BIRTHDAY", event, {
                loading: `Registering "${event.name}"...`,
                success: `"${event.name}" registered!`,
            }),
    );
}

export function useCreateDate() {
    const request = useAppRequest();
    return useMutation(
        "event/create/DATE",
        (event: Date) =>
            request.post("event/DATE", event, {
                loading: `Registering "${event.name}"...`,
                success: `"${event.name}" registered!`,
            }),
    );
}

export function useCreateMeeting() {
    const request = useAppRequest();
    return useMutation(
        "event/create/MEETING",
        (event: Meeting) =>
            request.post("event/MEETING", event, {
                loading: `Registering "${event.name}"...`,
                success: `"${event.name}" registered!`,
            }),
    );
}

export function useCreateParty() {
    const request = useAppRequest();
    return useMutation(
        "event/create/PARTY",
        (event: Party) =>
            request.post("event/PARTY", event, {
                loading: `Registering "${event.name}"...`,
                success: `"${event.name}" registered!`,
            }),
    );
}

export function useUpdateAppointment() {
    const request = useAppRequest();
    return useMutation(
        "event/update/APPOINTMENT",
        (event: Appointment) =>
            request.put(`event/APPOINTMENT/${event.id}`, event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateBirthday() {
    const request = useAppRequest();
    return useMutation(
        "event/update/BIRTHDAY",
        (event: Birthday) =>
            request.put(`event/BIRTHDAY/${event.id}`, event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateDate() {
    const request = useAppRequest();
    return useMutation(
        "event/update/DATE",
        (event: Date) =>
            request.put(`event/DATE/${event.id}`, event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateMeeting() {
    const request = useAppRequest();
    return useMutation(
        "event/update/MEETING",
        (event: Meeting) =>
            request.put(`event/MEETING/${event.id}`, event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateParty() {
    const request = useAppRequest();
    return useMutation(
        "event/update/PARTY",
        (event: Party) =>
            request.put(`event/PARTY/${event.id}`, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useFindEvents() {
    const request = useAppRequest();
    return useQuery(
        "event/find",
        () => request.get<readonly Event[]>("event"),
    );
}

export function useDeleteEvent() {
    const request = useAppRequest();
    return useMutation(
        "event/delete",
        (id: Event["id"]) =>
            request.delete(`event/${id}`, {
                loading: `Deleting event...`,
                success: `Event deleted!`,
            }),
    );
}
