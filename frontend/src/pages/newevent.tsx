import type { Event } from "@/features/event/event";
import { useEffect } from "react";
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
} from "@/content/event/options";

type EventForm = {
    readonly name: Event["name"];
    readonly day: string;
    readonly begin: string;
    readonly end: string;
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly repeats: boolean;
    readonly weekendRepeat: Event["weekendRepeat"];
};

/**
 * se encontro
 * define como não repete
 * bloqueia os campos
 */

// repete no fim de semana só é permitido se a frequencia for 1_d ou 2_d

export default function EventRegister() {
    const { register, handleSubmit, watch, setValue } = useForm<
        EventForm
    >();
    const watchCategory = watch("category");
    const watchRepeats = watch("repeats");

    const isBirthday = watchCategory === "BIRTHDAY";

    function submit(data: EventForm) {
        console.log(data);
    }

    useEffect(() => {
        console.log(watchCategory);
        if (watchCategory === "BIRTHDAY") {
            setValue("frequency", "1_Y");
            setValue("begin", "00:00");
            setValue("end", "23:59");
            setValue("repeats", true);
        }
    }, [watchCategory]);

    useEffect(() => {
        console.log(watchRepeats);
    }, [watchRepeats]);

    return (
        <PageContent>
            <FormContainer>
                <Form
                    title="Register new event"
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
                    <Group>
                        <InputField name="category" title="Category">
                            <SelectInput
                                {...register("category", {
                                    required: true,
                                })}
                                options={categoryOptions}
                            />
                        </InputField>
                    </Group>
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
                                    disabled: isBirthday,
                                })}
                            />
                        </InputField>
                        <InputField name="end" title="End">
                            <TimeInput
                                {...register("end", {
                                    required: true,
                                    disabled: isBirthday,
                                })}
                            />
                        </InputField>
                    </Group>
                    <Group>
                        <InputField name="repeats" title="Repeats">
                            <CheckInput
                                {...register("repeats", {
                                    required: true,
                                })}
                            />
                        </InputField>
                        <InputField
                            name="weekendRepeat"
                            title="Repeats on weekend"
                        >
                            <CheckInput
                                {...register("weekendRepeat", {
                                    required: true,
                                })}
                            />
                        </InputField>
                    </Group>
                    <InputField name="frequency" title="Frequency">
                        <SelectInput
                            {...register("frequency", {
                                required: true,
                            })}
                            options={frequencyOptions}
                        />
                    </InputField>
                </Form>
            </FormContainer>
        </PageContent>
    );
}
