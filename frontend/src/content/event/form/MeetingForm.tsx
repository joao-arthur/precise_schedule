import type { Meeting } from "frontend_core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { ToggleInput } from "@/components/atoms/input/ToggleInput";
import { frequencyOptions } from "../frequencyOptions";
import { getFormName } from "./getFormName";

type props = {
    readonly event?: Partial<Meeting>;
    readonly disabled: boolean;
    readonly onSubmit?: (form: Meeting) => void;
};

export function MeetingForm({ event, disabled, onSubmit }: props) {
    const { register, handleSubmit, watch, setValue } = useForm<Meeting>(
        event ? { defaultValues: event } : undefined,
    );
    const watchFrequency = watch("frequency");
    const canRepeatWeekend = watchFrequency ? ["1D", "2D"].includes(watchFrequency) : true;
    const required = true;

    useEffect(() => {
        if (!canRepeatWeekend) {
            setValue("weekendRepeat", false);
        }
    }, [watchFrequency]);

    return (
        <form
            id={getFormName("MEETING")}
            onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        >
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { required, disabled })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { required, disabled })} />
            </InputWrapper>
            <Group>
                <InputWrapper name="begin" title="Begin">
                    <TimeInput {...register("begin", { required, disabled })} />
                </InputWrapper>
                <InputWrapper name="end" title="End">
                    <TimeInput {...register("end", { required, disabled })} />
                </InputWrapper>
            </Group>
            <Group>
                <InputWrapper name="frequency" title="Frequency">
                    <SelectInput
                        {...register("frequency", { required, disabled })}
                        options={frequencyOptions}
                    />
                </InputWrapper>
                <InputWrapper name="weekendRepeat" title="Repeats on weekend">
                    <ToggleInput
                        {...register("weekendRepeat", { disabled: disabled || !canRepeatWeekend })}
                    />
                </InputWrapper>
            </Group>
        </form>
    );
}
