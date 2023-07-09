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

export function useEventAPI() {
    const request = useAppRequest();

    function createAppointment() {
        return useMutation(
            "event/create/APPOINTMENT",
            (event: AppointmentEvent) =>
                request.post("event/APPOINTMENT", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function createBirthday() {
        return useMutation(
            "event/create/BIRTHDAY",
            (event: BirthdayEvent) =>
                request.post("event/BIRTHDAY", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function createDate() {
        return useMutation(
            "event/create/DATE",
            (event: DateEvent) =>
                request.post("event/DATE", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function createMeeting() {
        return useMutation(
            "event/create/MEETING",
            (event: MeetingEvent) =>
                request.post("event/MEETING", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function createParty() {
        return useMutation(
            "event/create/PARTY",
            (event: PartyEvent) =>
                request.post("event/PARTY", event, {
                    loading: `Registering "${event.name}"...`,
                    error: `"${event.name}" could not be registered!`,
                    success: `"${event.name}" registered!`,
                }),
        );
    }

    function updateAppointment() {
        return useMutation(
            "event/update/APPOINTMENT",
            (event: AppointmentEvent) =>
                request.post("event/APPOINTMENT", event, {
                    loading: `Saving "${event.name}"...`,
                    error: `"${event.name}" could not be edited!`,
                    success: `"${event.name}" edited!`,
                }),
        );
    }

    function updateBirthday() {
        return useMutation(
            "event/update/BIRTHDAY",
            (event: BirthdayEvent) =>
                request.post("event/BIRTHDAY", event, {
                    loading: `Saving "${event.name}"...`,
                    error: `"${event.name}" could not be edited!`,
                    success: `"${event.name}" edited!`,
                }),
        );
    }

    function updateDate() {
        return useMutation(
            "event/update/DATE",
            (event: DateEvent) =>
                request.post("event/DATE", event, {
                    loading: `Saving "${event.name}"...`,
                    error: `"${event.name}" could not be edited!`,
                    success: `"${event.name}" edited!`,
                }),
        );
    }

    function updateMeeting() {
        return useMutation(
            "event/update/MEETING",
            (event: MeetingEvent) =>
                request.post("event/MEETING", event, {
                    loading: `Saving "${event.name}"...`,
                    error: `"${event.name}" could not be edited!`,
                    success: `"${event.name}" edited!`,
                }),
        );
    }

    function updateParty() {
        return useMutation(
            "event/update/PARTY",
            (event: PartyEvent) =>
                request.post("event/PARTY", event, {
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
        createAppointment,
        createBirthday,
        createDate,
        createMeeting,
        createParty,
        updateAppointment,
        updateBirthday,
        updateDate,
        updateMeeting,
        updateParty,
        find,
        remove,
    };
}
