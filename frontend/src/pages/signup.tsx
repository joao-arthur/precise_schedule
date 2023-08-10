import type { CreateUser } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useSessionManager } from "@/features/session/useSessionManager";
import { useUserCreate } from "@/features/user/useUserAPI";
import { Link } from "@/components/atoms/Link";
import { TextInput } from "@/components/atoms/input/TextInput";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { EmailInput } from "@/components/atoms/input/EmailInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { Form } from "@/components/molecules/Form";
import { Badge } from "@/components/molecules/badge/Badge";
import { RoundButton } from "@/components/atoms/extraButton/RoundButton";
import { Icon } from "@/components/atoms/Icon";
import { BorderedBox } from "@/components/atoms/layout/BorderedBox";
import { Header } from "@/content/base/Header";

function strMinLenValid(value: unknown) {
    if (typeof value !== "string" || value.length < 8) {
        return false;
    }
    return true;
}

function strMinLowerValid(value: unknown) {
    if (typeof value !== "string") {
        return false;
    }
    const lowerLen = value
        .replaceAll(
            /0|1|2|3|4|5|6|7|8|9| |\!|\@|\#|\$|\%|\¨|\&|\*|\(|\)|\[|\]|\{|\}|\+|\-|\*|\<|\>|\,|\.|\;|\:|\'|\"|\`|\~|\^|\?|\´/g,
            "",
        )
        .split("")
        .reduce((acc, c) => acc + Number(c.toLocaleLowerCase() === c), 0);
    if (1 > lowerLen) {
        return false;
    }
    return true;
}

function strMinNumValid(value: unknown) {
    if (typeof value !== "string") {
        return false;
    }
    const numLen = value.replaceAll(/[^\d]/g, "").length;
    if (1 > numLen) {
        return false;
    }
    return true;
}

function strMinSpecialValid(value: unknown) {
    if (typeof value !== "string") {
        return false;
    }
    const numLen = value.replaceAll(
        /[^(!|@|#|$|%|¨|&|*|(|\)|[|\]|{|})]/g,
        "",
    ).length;
    if (1 > numLen) {
        return false;
    }
    return true;
}

function strMinUpperValid(value: unknown) {
    if (typeof value !== "string") {
        return false;
    }
    const upperLen = value
        .replaceAll(
            /0|1|2|3|4|5|6|7|8|9| |\!|\@|\#|\$|\%|\¨|\&|\*|\(|\)|\[|\]|\{|\}|\+|\-|\*|\<|\>|\,|\.|\;|\:|\'|\"|\`|\~|\^|\?|\´/g,
            "",
        )
        .split("")
        .reduce((acc, c) => acc + Number(c.toLocaleUpperCase() === c), 0);
    if (1 > upperLen) {
        return false;
    }
    return true;
}

export default function SignUp() {
    useAnonPage();
    const { register, handleSubmit, watch } = useForm<CreateUser>();
    const { log } = useSessionManager();
    const { mutate, isLoading, data } = useUserCreate();

    const password = watch("password");

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
                            <RoundButton>
                                <Icon name="<" size={9} color="white" className="p-2" />
                            </RoundButton>
                        </div>
                    </Link>
                }
            />
            <main className="flex h-full">
                <PageContent>
                    <FormContainer>
                        <BorderedBox filled>
                            <Form
                                action="CREATE ACCOUNT"
                                disabled={isLoading}
                                onSubmit={handleSubmit((data) => mutate(data))}
                            >
                                <InputWrapper name="firstName" title="First name">
                                    <TextInput
                                        {...register("firstName", {
                                            required: true,
                                            disabled: isLoading,
                                        })}
                                    />
                                </InputWrapper>
                                <InputWrapper name="birthdate" title="Birthdate">
                                    <DateInput
                                        {...register("birthdate", {
                                            required: true,
                                            disabled: isLoading,
                                        })}
                                    />
                                </InputWrapper>
                                <InputWrapper name="email" title="E-mail">
                                    <EmailInput
                                        {...register("email", {
                                            required: true,
                                            disabled: isLoading,
                                        })}
                                    />
                                </InputWrapper>
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
                                            validate: (value) =>
                                                strMinLenValid(value) && strMinNumValid(value) &&
                                                strMinUpperValid(value) && strMinLowerValid(value),
                                        })}
                                    />
                                    <div className="flex flex-col py-2 gap-2">
                                        <Badge
                                            valid={strMinLenValid(password)}
                                            label="At least 8 characters"
                                        />
                                        <Badge
                                            valid={strMinNumValid(password)}
                                            label="At least 1 number"
                                        />
                                        <Badge
                                            valid={strMinUpperValid(password)}
                                            label="At least 1 uppercase letter"
                                        />
                                        <Badge
                                            valid={strMinLowerValid(password)}
                                            label="At least 1 lowercase letter"
                                        />
                                        <Badge
                                            valid={strMinSpecialValid(password)}
                                            label="At least 1 of !@#$%¨&*()[]{}"
                                        />
                                    </div>
                                </InputWrapper>
                            </Form>
                        </BorderedBox>
                    </FormContainer>
                </PageContent>
            </main>
        </>
    );
}
