import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";

type props = {
    readonly event: BirthdayEvent;
};

export function BirthdayInfo({ event }: props) {
    const { register } = useForm<BirthdayEvent>();
    const disabled = true;

    return (
        <form id="BirthdayInfo">
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { disabled, value: event.name })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { disabled, value: event.day })} />
            </InputWrapper>
        </form>
    );
}
