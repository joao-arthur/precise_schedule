import type { MeetingEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/organisms/Form";
import { InputField } from "@/components/atoms/InputField";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { CheckInput } from "@/components/atoms/input/CheckInput";
import { buildMeetingEvent } from "@/features/event/buildMeetingEvent";
import { frequencyOptions } from "./frequencyOptions";

export default function MeetingEventRegister() {
    const { register, handleSubmit, watch, setValue } = useForm<
        MeetingEvent
    >();
    const watchFrequency = watch("frequency");
    const canRepeatWeekend = ["1_D", "2_D"].includes(
        watchFrequency,
    );

    function submit(data: MeetingEvent) {
        console.log(buildMeetingEvent(data));
    }

    useEffect(() => {
        console.log(watchFrequency);
        if (!canRepeatWeekend) {
            setValue("weekendRepeat", false);
        }
    }, [watchFrequency]);

    return (
        <Form
            title="New meeting"
            action="SAVE"
            loading={false}
            onSubmit={handleSubmit(submit)}
        >
            <InputField name="name" title="Name">
                <TextInput
                    {...register("name", {
                        required: true,
                    })}
                />
            </InputField>
            <InputField name="day" title="Day">
                <DateInput
                    {...register("day", {
                        required: true,
                    })}
                />
            </InputField>
            <Group>
                <InputField name="begin" title="Begin">
                    <TimeInput
                        {...register("begin", {
                            required: true,
                        })}
                    />
                </InputField>
                <InputField name="end" title="End">
                    <TimeInput
                        {...register("end", {
                            required: true,
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
                            disabled: !canRepeatWeekend,
                        })}
                    />
                </InputField>
            </Group>
        </Form>
    );
}
