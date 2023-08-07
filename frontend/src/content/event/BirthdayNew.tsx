import type { BirthdayEvent } from "@/features/event/event";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";

type props = {
    readonly onSubmit: (form: BirthdayEvent) => void;
    readonly isLoading: boolean;
};

export function BirthdayNew({ onSubmit, isLoading }: props) {
    const { register, handleSubmit } = useForm<BirthdayEvent>();
    const disabled = isLoading;
    const required = true;

    return (
        <form id="BirthdayNew" onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { required, disabled })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { required, disabled })} />
            </InputWrapper>
        </form>
    );
}
