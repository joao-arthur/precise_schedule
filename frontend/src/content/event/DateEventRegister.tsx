import type { DateEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Form } from "@/components/organisms/Form";
import { InputField } from "@/components/atoms/InputField";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { SubHeader } from "@/content/base/subHeader/SubHeader";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { buildDateEvent } from "@/features/event/buildDateEvent";

export default function DateEventRegister() {
    const { register, handleSubmit } = useForm<
        DateEvent
    >();

    function submit(data: DateEvent) {
        console.log(buildDateEvent(data));
    }

    return (
        <div className="w-full">
            <SubHeader
                left={
                    <Link to="/">
                        <ButtonIcon
                            name="chevron-left"
                            size="medium"
                        />
                    </Link>
                }
            />
            <PageContent>
                <FormContainer>
                    <Form
                        title="New date"
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
                    </Form>
                </FormContainer>
            </PageContent>
        </div>
    );
}
