import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateMeeting } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { MeetingForm } from "./MeetingForm";

type props = {
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function MeetingCreateModal({ open, onCancel }: props) {
    const { mutate, isLoading, isSuccess } = useCreateMeeting();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <Modal
            title="NEW MEETING"
            visible={open}
            formId="MeetingForm"
            onCancel={onCancel}
            confirmLabel="SAVE"
        >
            <MeetingForm disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
