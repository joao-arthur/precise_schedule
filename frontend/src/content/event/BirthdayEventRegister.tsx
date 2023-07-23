import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { ModalForm } from "@/components/atoms/ModalForm";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { useCreateBirthday } from "@/features/event/useEventAPI";

export default function BirthdayEventRegister() {
    const { register, handleSubmit } = useForm<BirthdayEvent>();
    const { mutate, isLoading } = useCreateBirthday();

    function submit(data: BirthdayEvent) {
        mutate(data);
    }

    return (
        <ModalForm
            id="BirthdayEventRegister"
            onSubmit={handleSubmit(submit)}
        >
            <InputWrapper name="name" title="Name">
                <TextInput
                    {...register("name", {
                        required: true,
                        disabled: isLoading,
                    })}
                />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput
                    {...register("day", {
                        required: true,
                        disabled: isLoading,
                    })}
                />
            </InputWrapper>
        </ModalForm>
    );
}
