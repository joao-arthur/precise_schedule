import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";

type props = {
    readonly event: BirthdayEvent;
    readonly onSubmit: (form: BirthdayEvent) => void;
    readonly isLoading: boolean;
};

export function BirthdayEdit({ onSubmit, isLoading, event }: props) {
    const { register, handleSubmit } = useForm<BirthdayEvent>();
    const disabled = isLoading;
    const required = true;

    return (
        <form id="BirthdayEdit" onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { required, disabled, value: event.name })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { required, disabled, value: event.day })} />
            </InputWrapper>
        </form>
    );
}
