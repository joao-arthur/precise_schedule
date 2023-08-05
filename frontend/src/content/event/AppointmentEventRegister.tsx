import type { AppointmentEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ModalForm } from "@/components/atoms/ModalForm";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { ToggleInput } from "@/components/atoms/input/ToggleInput";
import { frequencyOptions } from "./frequencyOptions";

type props = {
    readonly onSubmit: (form: AppointmentEvent) => void;
    readonly isLoading: boolean;
};

export function AppointmentEventRegister({ onSubmit, isLoading }: props) {
    const { register, handleSubmit, watch, setValue } = useForm<AppointmentEvent>();

    const watchFrequency = watch("frequency");
    const canRepeatWeekend = watchFrequency ? ["1D", "2D"].includes(watchFrequency) : true;

    useEffect(() => {
        if (!canRepeatWeekend) {
            setValue("weekendRepeat", false);
        }
    }, [watchFrequency]);

    return (
        <ModalForm
            id="AppointmentEventRegister"
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
            <Group>
                <InputWrapper name="begin" title="Begin">
                    <TimeInput
                        {...register("begin", {
                            required: true,
                            disabled: isLoading,
                        })}
                    />
                </InputWrapper>
                <InputWrapper name="end" title="End">
                    <TimeInput
                        {...register("end", {
                            required: true,
                            disabled: isLoading,
                        })}
                    />
                </InputWrapper>
            </Group>
            <Group>
                <InputWrapper
                    name="frequency"
                    title="Frequency"
                >
                    <SelectInput
                        {...register("frequency", {
                            required: true,
                            disabled: isLoading,
                        })}
                        options={frequencyOptions}
                    />
                </InputWrapper>
                <InputWrapper
                    name="weekendRepeat"
                    title="Repeats on weekend"
                >
                    <ToggleInput
                        {...register("weekendRepeat", {
                            disabled: !canRepeatWeekend || isLoading,
                        })}
                    />
                </InputWrapper>
            </Group>
        </ModalForm>
    );
}
