import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { ModalForm } from "@/components/atoms/ModalForm";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";

type props = {
    readonly onSubmit: (form: BirthdayEvent) => void;
    readonly isLoading: boolean;
};

export function BirthdayEventRegister({ onSubmit, isLoading }: props) {
    const { register, handleSubmit } = useForm<BirthdayEvent>();

    return (
        <ModalForm
            id="BirthdayEventRegister"
            onSubmit={handleSubmit(onSubmit)}
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
