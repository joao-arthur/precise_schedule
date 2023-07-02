import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Form } from "@/components/organisms/Form";
import { InputField } from "@/components/atoms/InputField";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { buildBirthdayEvent } from "@/features/event/buildBirthdayEvent";
import { SubHeader } from "@/content/base/subHeader/SubHeader";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";

export default function BirthdayEventRegister() {
    const { register, handleSubmit } = useForm<BirthdayEvent>();

    function submit(data: BirthdayEvent) {
        console.log(buildBirthdayEvent(data));
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
                </FormContainer>
            </PageContent>
        </div>
    );
}
