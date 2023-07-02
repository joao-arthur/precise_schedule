import type { MeetingEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ModalForm } from "@/components/atoms/ModalForm";
import { InputField } from "@/components/atoms/InputField";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { CheckInput } from "@/components/atoms/input/CheckInput";
import { buildMeetingEvent } from "@/features/event/buildMeetingEvent";
import { frequencyOptions } from "./frequencyOptions";
import { useEventAPI } from "@/features/event/useEventAPI";

export default function MeetingEventRegister() {
    const { register, handleSubmit, watch, setValue } = useForm<
        MeetingEvent
    >();
    const { mutate, isLoading } = useEventAPI().create();

    const watchFrequency = watch("frequency");
    const canRepeatWeekend = watchFrequency
        ? ["1_D", "2_D"].includes(
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
            <InputField name="name" title="Name">
                <TextInput
                    {...register("name", {
                        required: true,
                        disabled: isLoading,
                    })}
                />
            </InputField>
            <InputField name="day" title="Day">
                <DateInput
                    {...register("day", {
                        required: true,
                        disabled: isLoading,
                    })}
                />
            </InputField>
            <Group>
                <InputField name="begin" title="Begin">
                    <TimeInput
                        {...register("begin", {
                            required: true,
                            disabled: isLoading,
                        })}
                    />
                </InputField>
                <InputField name="end" title="End">
                    <TimeInput
                        {...register("end", {
                            required: true,
                            disabled: isLoading,
                        })}
                    />
                </InputField>
            </Group>
            <Group>
                <InputField
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
                </InputField>
                <InputField
                    name="weekendRepeat"
                    title="Repeats on weekend"
                >
                    <CheckInput
                        {...register("weekendRepeat", {
                            required: true,
                            disabled: !canRepeatWeekend || isLoading,
                        })}
                    />
                </InputField>
            </Group>
        </ModalForm>
    );
}
