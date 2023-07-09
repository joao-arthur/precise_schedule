import type { Login } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useUserAPI } from "@/features/user/useUserAPI";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Text } from "@/components/atoms/typography/Text";
import { Link } from "@/components/atoms/Link";
import { InputField } from "@/components/atoms/InputField";
import { TextInput } from "@/components/atoms/input/TextInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { Box } from "@/components/atoms/layout/Box";
import { FilledBox } from "@/components/atoms/layout/FilledBox";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Form } from "@/components/organisms/Form";

export default function SignIn() {
    useAnonPage();
    const { register, handleSubmit } = useForm<Login>();
    const { log } = useSessionManager();
    const { mutate, isLoading, data } = useUserAPI().login();

    useEffect(() => {
        if (data) {
            log(data);
        }
    }, [data]);

    return (
        <PageContent>
            <FormContainer>
                <Form
                    title="Access your account"
                    action="SIGN IN"
                    loading={isLoading}
                    onSubmit={handleSubmit((data) => mutate(data))}
                >
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
                    >
                        <PasswordInput
                            {...register("password", {
                                required: true,
                                minLength: 10,
                                disabled: isLoading,
                            })}
                        />
                    </InputField>
                </Form>
                <FilledBox>
                    <Text>
                        <Link to="/password/forgot">
                            Forgot your password?
                        </Link>
                    </Text>
                </FilledBox>
                <Box>
                    <Text>
                        New to PreciseSchedule? <Link to="/signup">Create an account</Link>
                    </Text>
                </Box>
            </FormContainer>
        </PageContent>
    );
}
