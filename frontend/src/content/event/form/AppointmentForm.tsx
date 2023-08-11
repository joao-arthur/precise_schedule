import type { FormEvent } from "react";
import type { Appointment, AppointmentForm as AppointmentFormType } from "frontend_core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { appointmentFns } from "frontend_core";
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
    readonly event?: Partial<Appointment>;
    readonly disabled: boolean;
    readonly onSubmit?: (form: Appointment) => void;
};

export function AppointmentForm({ event, disabled, onSubmit }: props) {
    const { register, handleSubmit, watch, setValue } = useForm<AppointmentFormType>(
        event ? { defaultValues: appointmentFns.toForm(event) } : undefined,
    );
    const frequency = watch("frequency");
    const repeats = watch("repeats");

    const canRepeatWeekend = frequency ? ["1D", "2D"].includes(frequency) : true;
    const required = true;

    useEffect(() => {
        if (!canRepeatWeekend) {
            setValue("weekendRepeat", false);
        }
    }, [frequency]);

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        if (!onSubmit) return;
        handleSubmit((form) => {
            onSubmit(appointmentFns.fromForm(form));
        })(e);
    }

    return (
        <form id={getFormName("APPOINTMENT")} onSubmit={handleOnSubmit}>
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
                <InputWrapper name="repeats" title="Repeats">
                    <ToggleInput {...register("repeats", { disabled })} />
                </InputWrapper>
                <InputWrapper
                    name="weekendRepeat"
                    title="Repeats on weekend"
                    hidden={repeats === false}
                >
                    <ToggleInput
                        {...register("weekendRepeat", { disabled: disabled || !canRepeatWeekend })}
                    />
                </InputWrapper>
            </Group>
            <InputWrapper name="frequency" title="Frequency" hidden={repeats === false}>
                <SelectInput
                    {...register("frequency", { required, disabled })}
                    options={frequencyOptions}
                />
            </InputWrapper>
        </form>
    );
}
