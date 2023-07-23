import type { Login } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useUserLogin } from "@/features/user/useUserAPI";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Text } from "@/components/atoms/typography/Text";
import { Link } from "@/components/atoms/Link";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { Box } from "@/components/atoms/layout/Box";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Form } from "@/components/organisms/Form";
import { SubHeader } from "@/content/base/subHeader/SubHeader";

export default function SignIn() {
    useAnonPage();
    const { register, handleSubmit } = useForm<Login>();
    const { log } = useSessionManager();
    const { mutate, isLoading, data } = useUserLogin();

    useEffect(() => {
        if (data) {
            log(data);
        }
    }, [data]);

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
                        action="SIGN IN"
                        loading={isLoading}
                        onSubmit={handleSubmit((data) => mutate(data))}
                    >
                        <InputWrapper name="username" title="Username">
                            <TextInput
                                {...register("username", {
                                    required: true,
                                    disabled: isLoading,
                                })}
                            />
                        </InputWrapper>
                        <InputWrapper
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
                        </InputWrapper>
                    </Form>
                    <Box>
                        <Text>
                            <Link to="/password/forgot">
                                Forgot your password?
                            </Link>
                        </Text>
                    </Box>
                    <Box>
                        <Text>
                            Don't have an account? <Link to="/signup">Create an account</Link>
                        </Text>
                    </Box>
                </FormContainer>
            </PageContent>
        </div>
    );
}
