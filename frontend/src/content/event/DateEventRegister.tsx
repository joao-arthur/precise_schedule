import type { DateEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { ModalForm } from "@/components/atoms/ModalForm";
import { InputField } from "@/components/atoms/InputField";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { buildDateEvent } from "@/features/event/buildDateEvent";
import { useEventAPI } from "@/features/event/useEventAPI";

export default function DateEventRegister() {
    const { register, handleSubmit } = useForm<
        DateEvent
    >();
    const { mutate, isLoading } = useEventAPI().create();

    function submit(data: DateEvent) {
        const event = buildDateEvent(data);
        mutate(event);
    }

    return (
        <ModalForm
            id="DateEventRegister"
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
        </ModalForm>
    );
}
