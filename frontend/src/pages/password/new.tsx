import type { NewPassword } from "@/features/user/user";
import { useForm } from "react-hook-form";
import { Form } from "@/components/organisms/Form";
import { SubHeader } from "@/content/base/subHeader/SubHeader";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { useAuthPage } from "@/features/session/useAuthPage";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";

export default function NewPassword() {
    useAuthPage();
    const { register, handleSubmit } = useForm<NewPassword>();

    function handle(data: NewPassword) {
        console.log(data);
    }

    const validations = [
        "At least 8 characters",
        "At least 1 number",
        "At least 1 uppercase letter",
        "At least 1 lowercase letter",
        "At least 1 special character",
    ];

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
                        action="CREATE NEW PASSWORD"
                        loading={false}
                        onSubmit={handleSubmit(handle)}
                    >
                        <InputWrapper
                            name="password"
                            title="Password"
                        >
                            <PasswordInput
                                {...register("password", {
                                    required: true,
                                    minLength: 10,
                                })}
                            />
                            <div>
                                {validations.join("\n")}
                            </div>
                        </InputWrapper>
                    </Form>
                </FormContainer>
            </PageContent>
        </div>
    );
}
