import type {
    AppointmentEvent,
    BirthdayEvent,
    DateEvent,
    Event,
    MeetingEvent,
    PartyEvent,
} from "./event";
import { useMutation } from "react-query";
import { useAppRequest } from "@/lib/request/useAppRequest";

export function useCreateAppointment() {
    const request = useAppRequest();
    return useMutation(
        "event/create/APPOINTMENT",
        (event: AppointmentEvent) =>
            request.post("event/APPOINTMENT", event, {
                loading: `Registering "${event.name}"...`,
                //error: `"${event.name}" could not be registered!`,
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
                //error: `"${event.name}" could not be registered!`,
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
                //error: `"${event.name}" could not be registered!`,
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
                //error: `"${event.name}" could not be registered!`,
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
                //error: `"${event.name}" could not be registered!`,
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
                //error: `"${event.name}" could not be edited!`,
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
                //error: `"${event.name}" could not be edited!`,
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
                //error: `"${event.name}" could not be edited!`,
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
                //error: `"${event.name}" could not be edited!`,
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
                //error: `"${event.name}" could not be edited!`,
                success: `"${event.name}" edited!`,
            }),
    );
}

export function useFindEvent() {
    const request = useAppRequest();
    return useMutation(
        "event/find",
        () => request.get<readonly Event[]>("event"),
    );
}

export function useRemoveEvent() {
    const request = useAppRequest();
    return useMutation(
        "event/remove",
        (id: Event["id"]) =>
            request.delete(`event/${id}`, {
                loading: `Deleting event...`,
                //error: `The event could not be deleted!`,
                success: `Event deleted!`,
            }),
    );
}
