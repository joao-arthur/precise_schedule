import type { Event } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import {
    useUpdateAppointment,
    useUpdateBirthday,
    useUpdateDate,
    useUpdateMeeting,
    useUpdateParty,
} from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { AppointmentForm } from "./AppointmentForm";
import { BirthdayForm } from "./BirthdayForm";
import { DateForm } from "./DateForm";
import { MeetingForm } from "./MeetingForm";
import { PartyForm } from "./PartyForm";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function EditEvent({ event, onCancel }: props) {
    const {
        mutate: mutateAppointment,
        isSuccess: isSuccessAppointment,
        isLoading: isLoadingAppointment,
    } = useUpdateAppointment();
    const { mutate: mutateBirthday, isSuccess: isSuccessBirthday, isLoading: isLoadingBirthday } =
        useUpdateBirthday();
    const { mutate: mutateDate, isSuccess: isSuccessDate, isLoading: isLoadingDate } =
        useUpdateDate();
    const { mutate: mutateMeeting, isSuccess: isSuccessMeeting, isLoading: isLoadingMeeting } =
        useUpdateMeeting();
    const { mutate: mutateParty, isSuccess: isSuccessParty, isLoading: isLoadingParty } =
        useUpdateParty();

    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("getEvents");
        }
    }, [queryClient, isSuccess, onCancel]);

    function handleConfirm(event: Event) {
        switch (event.category) {
            case "APPOINTMENT":
                mutateAppointment(event);
                break;
            case "BIRTHDAY":
                mutateBirthday(event);
                break;
            case "DATE":
                mutateDate(event);
                break;
            case "MEETING":
                mutateMeeting(event);
                break;
            case "PARTY":
                mutateParty(event);
                break;
        }
    }

    return (
        <Modal
            visible
            title={`EDIT "${event.name.toLocaleUpperCase()}"`}
            onCancel={onCancel}
        >
            {event.category === "APPOINTMENT"
                ? <AppointmentForm event={event} disabled onSubmit={handleConfirm} />
                : event.category === "BIRTHDAY"
                ? <BirthdayForm event={event} disabled onSubmit={handleConfirm} />
                : event.category === "DATE"
                ? <DateForm event={event} disabled onSubmit={handleConfirm} />
                : event.category === "MEETING"
                ? <MeetingForm event={event} disabled onSubmit={handleConfirm} />
                : event.category === "PARTY"
                ? <PartyForm event={event} disabled onSubmit={handleConfirm} />
                : null}
        </Modal>
    );
}
