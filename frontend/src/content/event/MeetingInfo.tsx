import type { MeetingEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { ToggleInput } from "@/components/atoms/input/ToggleInput";
import { frequencyOptions } from "./frequencyOptions";

type props = {
    readonly event: MeetingEvent;
};

export function MeetingEdit({ event }: props) {
    const { register } = useForm<MeetingEvent>();
    const disabled = true;

    return (
        <form id="MeetingEdit">
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
            <Group>
                <InputWrapper name="frequency" title="Frequency">
                    <SelectInput
                        {...register("frequency", { disabled, value: event.frequency })}
                        options={frequencyOptions}
                    />
                </InputWrapper>
                <InputWrapper name="weekendRepeat" title="Repeats on weekend">
                    <ToggleInput
                        {...register("weekendRepeat", { disabled, value: event.weekendRepeat })}
                    />
                </InputWrapper>
            </Group>
        </form>
    );
}
