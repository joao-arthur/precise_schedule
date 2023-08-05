import type {
    AppointmentEvent,
    BirthdayEvent,
    DateEvent,
    Event,
    MeetingEvent,
    PartyEvent,
} from "./event";
import { useMutation, useQuery } from "react-query";
import { useAppRequest } from "@/lib/request/useAppRequest";

export function useCreateAppointment() {
    const request = useAppRequest();
    return useMutation(
        "event/create/APPOINTMENT",
        (event: AppointmentEvent) =>
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
        (event: BirthdayEvent) =>
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
        (event: DateEvent) =>
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
        (event: MeetingEvent) =>
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
        (event: PartyEvent) =>
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
        (event: AppointmentEvent) =>
            request.post("event/APPOINTMENT", event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateBirthday() {
    const request = useAppRequest();
    return useMutation(
        "event/update/BIRTHDAY",
        (event: BirthdayEvent) =>
            request.post("event/BIRTHDAY", event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateDate() {
    const request = useAppRequest();
    return useMutation(
        "event/update/DATE",
        (event: DateEvent) =>
            request.post("event/DATE", event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateMeeting() {
    const request = useAppRequest();
    return useMutation(
        "event/update/MEETING",
        (event: MeetingEvent) =>
            request.post("event/MEETING", event, {
                loading: `Saving "${event.name}"...`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useUpdateParty() {
    const request = useAppRequest();
    return useMutation(
        "event/update/PARTY",
        (event: PartyEvent) =>
            request.post("event/PARTY", event, {
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
