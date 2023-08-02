import type { CreateUser } from "@/features/user/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnonPage } from "@/features/session/useAnonPage";
import { useSessionManager } from "@/features/session/useSessionManager";
import { useUserCreate } from "@/features/user/useUserAPI";
import { Text } from "@/components/atoms/typography/Text";
import { Text2 } from "@/components/atoms/typography/Text2";
import { Link } from "@/components/atoms/Link";
import { TextInput } from "@/components/atoms/input/TextInput";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { EmailInput } from "@/components/atoms/input/EmailInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { PasswordInput } from "@/components/atoms/input/PasswordInput";
import { Box } from "@/components/atoms/layout/Box";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { ErrorBadge } from "@/components/atoms/ErrorBadge";
import { SuccessBadge } from "@/components/atoms/SuccessBadge";
import { Form } from "@/components/molecules/Form";
import { SubHeader } from "@/content/base/subHeader/SubHeader";

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
                            <div className="py-2">
                                <div className="flex gap-2 p-1 items-center">
                                    {strMinLenValid(password) ? <SuccessBadge /> : <ErrorBadge />}
                                    <Text2 size="sm">At least 8 characters</Text2>
                                </div>
                                <div className="flex gap-2 p-1 items-center">
                                    {strMinNumValid(password) ? <SuccessBadge /> : <ErrorBadge />}
                                    <Text2 size="sm">At least 1 number</Text2>
                                </div>
                                <div className="flex gap-2 p-1 items-center">
                                    {strMinUpperValid(password) ? <SuccessBadge /> : <ErrorBadge />}
                                    <Text2 size="sm">At least 1 uppercase letter</Text2>
                                </div>
                                <div className="flex gap-2 p-1 items-center">
                                    {strMinLowerValid(password) ? <SuccessBadge /> : <ErrorBadge />}
                                    <Text2 size="sm">At least 1 lowercase letter</Text2>
                                </div>
                                <div className="flex gap-2 p-1 items-center">
                                    {strMinSpecialValid(password)
                                        ? <SuccessBadge />
                                        : <ErrorBadge />}
                                    <Text2 size="sm">At least 1 of !@#$%¨&*()[]{}</Text2>
                                </div>
                            </div>
                        </InputWrapper>
                    </Form>
                    <Box>
                        <Text>
                            Already in PreciseSchedule? <Link to="/signin">Sign in</Link>
                        </Text>
                    </Box>
                </FormContainer>
            </PageContent>
        </div>
    );
}
