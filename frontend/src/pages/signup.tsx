import type { CreateUser, PasswordMatch } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useSessionManager } from "@/features/session/useSessionManager";
import { useUserAPI } from "@/features/user/useUserAPI";
import { Text } from "@/components/atoms/typography/Text";
import { Link } from "@/components/atoms/Link";
import { TextInput } from "@/components/atoms/input/TextInput";
import { InputField } from "@/components/atoms/InputField";
import { EmailInput } from "@/components/atoms/input/EmailInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { Box } from "@/components/atoms/layout/Box";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { Form } from "@/components/organisms/Form";
import { FormContainer } from "@/components/atoms/FormContainer";

type CreateUserForm = CreateUser & PasswordMatch;

export default function SignUp() {
    useAnonPage();
    const { register, handleSubmit } = useForm<CreateUserForm>();
    const { log } = useSessionManager();
    const { mutate, isLoading, data } = useUserAPI().create();

    useEffect(() => {
        if (data) {
            log(data);
        }
    }, [data]);

    return (
        <PageContent>
            <FormContainer>
                <Form
                    title="Create your account"
                    action="SIGN UP"
                    loading={isLoading}
                    onSubmit={handleSubmit((data) => mutate(data))}
                >
                    <InputField name="firstName" title="First name">
                        <TextInput
                            {...register("firstName", {
                                required: true,
                                disabled: isLoading,
                            })}
                        />
                    </InputField>
                    <InputField name="birthdate" title="Birthdate">
                        <DateInput
                            {...register("birthdate", {
                                required: true,
                                disabled: isLoading,
                            })}
                        />
                    </InputField>
                    <InputField name="email" title="E-mail">
                        <EmailInput
                            {...register("email", {
                                required: true,
                                disabled: isLoading,
                            })}
                        />
                    </InputField>
                    <InputField name="username" title="Username">
                        <TextInput
                            {...register("username", {
                                required: true,
                                disabled: isLoading,
                            })}
                        />
                    </InputField>
                    <InputField
                        name="password"
                        title="Password"
                        notice="At least 10 characters"
                    >
                        <PasswordInput
                            {...register("password", {
                                required: true,
                                minLength: 10,
                                disabled: isLoading,
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
                                disabled: isLoading,
                            })}
                        />
                    </InputField>
                </Form>
                <Box>
                    <Text>
                        Already in PreciseSchedule? <Link to="/signin">Sign in</Link>
                    </Text>
                </Box>
            </FormContainer>
        </PageContent>
    );
}
