import type { DateEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";

type props = {
    readonly event: DateEvent;
};

export function DateInfo({ event }: props) {
    const { register } = useForm<DateEvent>();
    const disabled = true;

    return (
        <form id="DateInfo">
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { disabled, value: event.name })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { disabled, value: event.day })} />
            </InputWrapper>
            <Group>
                <InputWrapper name="begin" title="Begin">
                    <TimeInput {...register("begin", { disabled, value: event.begin })} />
                </InputWrapper>
                <InputWrapper name="end" title="End">
                    <TimeInput {...register("end", { disabled, value: event.end })} />
                </InputWrapper>
            </Group>
        </form>
    );
}
