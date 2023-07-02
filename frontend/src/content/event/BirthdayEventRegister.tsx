import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { Form } from "@/components/organisms/Form";
import { InputField } from "@/components/atoms/InputField";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { buildBirthdayEvent } from "@/features/event/buildBirthdayEvent";

export default function BirthdayEventRegister() {
    const { register, handleSubmit } = useForm<BirthdayEvent>();

    function submit(data: BirthdayEvent) {
        console.log(buildBirthdayEvent(data));
    }

    return (
        <Form
            title="New birthday"
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
        </Form>
    );
}
