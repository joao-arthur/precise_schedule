import { useForm } from "react-hook-form";
import { Text } from "@/components/atoms/typography/Text";
import { Form } from "@/components/organisms/Form";
import { Link } from "@/components/atoms/Link";
import { Box } from "@/components/atoms/layout/Box";
import { ForgotPassword } from "@/features/user/user";
import { EmailInput } from "@/components/atoms/input/EmailInput";
import { InputField } from "@/components/atoms/InputField";
import { useAnonPage } from "@/features/session/useAnonPage";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";

export default function ForgotPassword() {
    useAnonPage();
    const { register, handleSubmit } = useForm<ForgotPassword>();

    function handle(data: ForgotPassword) {
        console.log(data);
    }

    return (
        <PageContent>
            <FormContainer>
                <Form
                    title="Forgot your password"
                    action="SEND INSTRUCTIONS"
                    loading={false}
                    onSubmit={handleSubmit(handle)}
                >
                    <InputField name="email" title="Email">
                        <EmailInput
                            {...register("email", { required: true })}
                        />
                    </InputField>
                </Form>
                <Box>
                    <Text>
                        Already in PreciseSchedule?{" "}
                        <Link to="/signin">Sign in</Link>
                    </Text>
                </Box>
                <Box>
                    <Text>
                        New to PreciseSchedule?{" "}
                        <Link to="/signup">Create an account</Link>
                    </Text>
                </Box>
            </FormContainer>
        </PageContent>
    );
}
