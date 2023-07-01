import type { Settings } from "@/features/user/user";
import { useForm } from "react-hook-form";
import { Link } from "@/components/atoms/Link";
import { Form } from "@/components/organisms/Form";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { InputField } from "@/components/atoms/InputField";
import { useAuthPage } from "@/features/session/useAuthPage";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";

export default function Settings() {
    useAuthPage();
    const { register, handleSubmit } = useForm<Settings>();

    //function onChangeTheme(newTheme: themeType) {
    //    setSettingsTheme(newTheme);
    //    theme.apply(newTheme);
    //}

    function handle(data: Settings) {
        console.log(data);
    }

    return (
        <PageContent>
            <FormContainer>
                <Form
                    title="Settings"
                    action="SAVE SETTINGS"
                    loading={false}
                    onSubmit={handleSubmit(handle)}
                >
                    <InputField name="language" title="Language">
                        <SelectInput
                            options={[
                                {
                                    id: "en-US",
                                    label: "🇺🇸 English (en-US)",
                                },
                                {
                                    id: "pt-BR",
                                    label: "🇧🇷 Portuguese (pt-BR)",
                                },
                                {
                                    id: "es-ES",
                                    label: "🇪🇸 Spanish (es-ES)",
                                },
                                {
                                    id: "de-DE",
                                    label: "🇩🇪 German (de-DE)",
                                },
                            ]}
                            {...register("language")}
                        />
                    </InputField>
                    {
                        /*<InputField
                name="twoFactorAuth"
                title="Enable two factor authentication"
            >
                <Toggle
                    {...register("twoFactorAuth")}
                />
                </InputField>*/
                    }
                    <InputField name="theme" title="Theme">
                        <SelectInput
                            options={[
                                { id: "light", label: "☀️ light" },
                                { id: "dark", label: "🌑 dark" },
                                { id: "auto", label: "🖥️ auto" },
                            ]}
                            {...register("theme")}
                        />
                    </InputField>
                    <Link to="password/new">Change password</Link>
                    <br />
                    <Link to="#">Delete my account</Link>
                    <br />
                    <Link to="#">
                        What info do PreciseSchedule know about you?
                    </Link>
                    <br />
                </Form>
            </FormContainer>
        </PageContent>
    );
}
