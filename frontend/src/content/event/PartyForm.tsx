import type { PartyEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";

type props = {
    readonly event?: PartyEvent;
    readonly disabled: boolean;
    readonly onSubmit?: (form: PartyEvent) => void;
};

export function PartyForm({ event, disabled, onSubmit }: props) {
    const { register, handleSubmit } = useForm<PartyEvent>();
    const required = true;

    return (
        <form id="PartyForm" onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { required, disabled, value: event?.name })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { required, disabled, value: event?.day })} />
            </InputWrapper>
            <Group>
                <InputWrapper name="begin" title="Begin">
                    <TimeInput
                        {...register("begin", { required, disabled, value: event?.begin })}
                    />
                </InputWrapper>
                <InputWrapper name="end" title="End">
                    <TimeInput {...register("end", { required, disabled, value: event?.end })} />
                </InputWrapper>
            </Group>
        </form>
    );
}
