import type { Event } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Form } from "@/components/organisms/Form";
import { InputField } from "@/components/atoms/InputField";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { CheckInput } from "@/components/atoms/input/CheckInput";
import {
    categoryOptions,
    frequencyOptions,
    importanceOptions,
} from "@/content/event/options";

type EventForm = {
    readonly name: string;
    readonly beginDate: string;
    readonly beginTime: string;
    readonly endDate: string;
    readonly endTime: string;
    readonly category: Event["category"];
    readonly importance: Event["importance"];
    readonly frequency: Event["frequency"];
    readonly repeats: boolean;
    readonly weekendRepeat: boolean;
};

export default function EventRegister() {
    const { register, handleSubmit } = useForm<EventForm>();

    function submit(data: EventForm) {
        console.log(data);
    }

    return (
        <PageContent>
            <FormContainer>
                <Form
                    title="Access your account"
                    action="SIGN IN"
                    loading={false}
                    onSubmit={handleSubmit(submit)}
                >
                    <InputField name="name" title="Name">
                        <TextInput {...register("name")} />
                    </InputField>
                    <Group>
                        <InputField name="category" title="Category">
                            <SelectInput
                                {...register("category")}
                                options={categoryOptions}
                            />
                        </InputField>
                        <InputField
                            name="importance"
                            title="Importance"
                        >
                            <SelectInput
                                {...register("importance")}
                                options={importanceOptions}
                            />
                        </InputField>
                    </Group>
                    <Group>
                        <InputField
                            name="beginDate"
                            title="Begin date"
                        >
                            <DateInput {...register("beginDate")} />
                        </InputField>
                        <InputField
                            name="beginTime"
                            title="Begin time"
                        >
                            <TimeInput {...register("beginTime")} />
                        </InputField>
                    </Group>
                    <Group>
                        <InputField name="endDate" title="End date">
                            <DateInput {...register("endDate")} />
                        </InputField>
                        <InputField name="endTime" title="End time">
                            <TimeInput {...register("endTime")} />
                        </InputField>
                    </Group>
                    <Group>
                        <InputField name="repeats" title="Repeats">
                            <CheckInput {...register("repeats")} />
                        </InputField>
                        <InputField
                            name="weekendRepeat"
                            title="Repeats on weekend"
                        >
                            <CheckInput
                                {...register("weekendRepeat")}
                            />
                        </InputField>
                    </Group>
                    <InputField name="frequency" title="Frequency">
                        <SelectInput
                            {...register("frequency")}
                            options={frequencyOptions}
                        />
                    </InputField>
                </Form>
            </FormContainer>
        </PageContent>
    );
}
