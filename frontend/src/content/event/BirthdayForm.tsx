import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";

type props = {
    readonly event?: BirthdayEvent;
    readonly disabled: boolean;
    readonly onSubmit: (form: BirthdayEvent) => void;
};

export function BirthdayForm({ event, disabled, onSubmit }: props) {
    const { register, handleSubmit } = useForm<BirthdayEvent>();
    const required = true;

    return (
        <form id="BirthdayForm" onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { required, disabled, value: event?.name })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { required, disabled, value: event?.day })} />
            </InputWrapper>
        </form>
    );
}
