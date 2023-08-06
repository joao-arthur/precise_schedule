import type { Login } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useUserLogin } from "@/features/user/useUserAPI";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Text } from "@/components/atoms/Text";
import { Link } from "@/components/atoms/Link";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { BorderedBox } from "@/components/atoms/layout/BorderedBox";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";
import { Form } from "@/components/molecules/Form";
import { Header } from "@/content/base/header/Header";

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
        <>
            <Header
                left={
                    <Link to="/">
                        <ButtonIcon
                            name="chevron-left"
                            size="medium"
                        />
                    </Link>
                }
            />
            <main className="flex h-full">
                <div className="w-full">
                    <PageContent>
                        <FormContainer>
                            <Form
                                action="SIGN IN"
                                disabled={isLoading}
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
                                            minLength: 8,
                                            disabled: isLoading,
                                        })}
                                    />
                                </InputWrapper>
                            </Form>
                            <BorderedBox>
                                <Text>
                                    Don't have an account?{" "}
                                    <Link to="/signup">Create an account</Link>
                                </Text>
                            </BorderedBox>
                        </FormContainer>
                    </PageContent>
                </div>
            </main>
        </>
    );
}
