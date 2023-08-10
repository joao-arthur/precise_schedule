import type { Login } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useUserLogin } from "@/features/user/useUserAPI";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Link } from "@/components/atoms/Link";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { BorderedBox } from "@/components/atoms/layout/BorderedBox";
import { Form } from "@/components/molecules/Form";
import { RoundButtonIcon } from "@/components/molecules/RoundButtonIcon";
import { Header } from "@/content/base/Header";

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
                        <div className="flex justify-center">
                            <RoundButtonIcon title="Back to calendar" icon="<" color="white" />
                        </div>
                    </Link>
                }
            />
            <main className="flex h-full">
                <PageContent>
                    <FormContainer>
                        <BorderedBox filled>
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
                        </BorderedBox>
                    </FormContainer>
                </PageContent>
            </main>
        </>
    );
}
