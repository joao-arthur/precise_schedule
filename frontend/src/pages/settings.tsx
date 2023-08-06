import type { Settings } from "@/features/user/user";
import { useForm } from "react-hook-form";
import { Link } from "@/components/atoms/Link";
import { SelectInput } from "@/components/atoms/input/SelectInput";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { PageContent } from "@/components/atoms/layout/PageContent";
import { FormContainer } from "@/components/atoms/FormContainer";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";
import { Form } from "@/components/molecules/Form";
import { useAuthPage } from "@/features/session/useAuthPage";
import { Header } from "@/content/base/header/Header";

export default function Settings() {
    useAuthPage();
    const { register, handleSubmit } = useForm<Settings>();

    function handle(data: Settings) {
        console.log(data);
    }

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
                <PageContent>
                    <FormContainer>
                        <Form
                            action="SAVE SETTINGS"
                            disabled={false}
                            onSubmit={handleSubmit(handle)}
                        >
                            <InputWrapper name="language" title="Language">
                                <SelectInput
                                    options={[
                                        {
                                            id: "en-US",
                                            label: "🇺🇸 English (en)",
                                        },
                                        {
                                            id: "pt-BR",
                                            label: "🇧🇷 Portuguese (pt)",
                                        },
                                        {
                                            id: "es-ES",
                                            label: "🇪🇸 Spanish (es)",
                                        },
                                        {
                                            id: "de-DE",
                                            label: "🇩🇪 German (de)",
                                        },
                                    ]}
                                    {...register("language")}
                                />
                            </InputWrapper>
                            <InputWrapper name="theme" title="Theme">
                                <SelectInput
                                    options={[
                                        { id: "light", label: "☀️ light" },
                                        { id: "dark", label: "🌑 dark" },
                                        { id: "auto", label: "🖥️ auto" },
                                    ]}
                                    {...register("theme")}
                                />
                            </InputWrapper>
                            <Link to="#">Delete my account</Link>
                            <br />
                            <Link to="#">
                                What info do PreciseSchedule know about you?
                            </Link>
                            <br />
                        </Form>
                    </FormContainer>
                </PageContent>
            </main>
        </>
    );
}
