import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { ModalForm } from "@/components/atoms/ModalForm";
import { InputField } from "@/components/atoms/InputField";
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
            <InputField name="name" title="Name">
                <TextInput
                    {...register("name", {
                        required: true,
                        disabled: isLoading,
                    })}
                />
            </InputField>
            <InputField name="day" title="Day">
                <DateInput
                    {...register("day", {
                        required: true,
                        disabled: isLoading,
                    })}
                />
            </InputField>
        </ModalForm>
    );
}
