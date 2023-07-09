import type { NewPassword, PasswordMatch } from "@/features/user/user";
import { useForm } from "react-hook-form";
import { Form } from "@/components/organisms/Form";
import { SubHeader } from "@/content/base/subHeader/SubHeader";
import { InputField } from "@/components/atoms/InputField";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { useAuthPage } from "@/features/session/useAuthPage";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";

type NewPasswordInfo = NewPassword & PasswordMatch;

export default function NewPassword() {
    useAuthPage();

    const { register, handleSubmit } = useForm<NewPasswordInfo>();

    function handle(data: NewPasswordInfo) {
        console.log(data);
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
                        title="new password"
                        action="CREATE NEW PASSWORD"
                        loading={false}
                        onSubmit={handleSubmit(handle)}
                    >
                        <InputField
                            name="password"
                            title="Password"
                            notice="At least 10 characters"
                        >
                            <PasswordInput
                                {...register("password", {
                                    required: true,
                                    minLength: 10,
                                })}
                            />
                        </InputField>
                        <InputField
                            name="passwordMatch"
                            title="Type password again"
                            notice="At least 10 characters"
                        >
                            <PasswordInput
                                {...register("passwordMatch", {
                                    required: true,
                                    minLength: 10,
                                })}
                            />
                        </InputField>
                    </Form>
                </FormContainer>
            </PageContent>
        </div>
    );
}
