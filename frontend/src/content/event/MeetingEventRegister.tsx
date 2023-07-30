import type { MeetingEvent } from "@/features/event/event";
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
import { useCreateMeeting } from "@/features/event/useEventAPI";

export default function MeetingEventRegister() {
    const { register, handleSubmit, watch, setValue } = useForm<MeetingEvent>();
    const { mutate, isLoading } = useCreateMeeting();

    const watchFrequency = watch("frequency");
    const canRepeatWeekend = watchFrequency
        ? ["1D", "2D"].includes(
            watchFrequency,
        )
        : true;

    function submit(data: MeetingEvent) {
        const event = buildMeetingEvent(data);
        mutate(event);
    }

    useEffect(() => {
        if (!canRepeatWeekend) {
            setValue("weekendRepeat", false);
        }
    }, [watchFrequency]);

    return (
        <ModalForm
            id="MeetingEventRegister"
            onSubmit={handleSubmit(submit)}
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
                            required: true,
                            disabled: !canRepeatWeekend || isLoading,
                        })}
                    />
                </InputWrapper>
            </Group>
        </ModalForm>
    );
}
