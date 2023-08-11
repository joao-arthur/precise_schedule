import type { Party } from "frontend_core";
import { useForm } from "react-hook-form";
import { InputWrapper } from "@/components/atoms/form/InputWrapper";
import { Group } from "@/components/atoms/layout/Group";
import { TextInput } from "@/components/atoms/input/TextInput";
import { DateInput } from "@/components/atoms/input/DateInput";
import { TimeInput } from "@/components/atoms/input/TimeInput";
import { getFormName } from "./getFormName";

type props = {
    readonly event?: Partial<Party>;
    readonly disabled: boolean;
    readonly onSubmit?: (form: Party) => void;
};

export function PartyForm({ event, disabled, onSubmit }: props) {
    const { register, handleSubmit } = useForm<Party>(
        event ? { defaultValues: event } : undefined,
    );
    const required = true;

    return (
        <form
            id={getFormName("PARTY")}
            onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        >
            <InputWrapper name="name" title="Name">
                <TextInput {...register("name", { required, disabled })} />
            </InputWrapper>
            <InputWrapper name="day" title="Day">
                <DateInput {...register("day", { required, disabled })} />
            </InputWrapper>
            <Group>
                <InputWrapper name="begin" title="Begin">
                    <TimeInput {...register("begin", { required, disabled })} />
                </InputWrapper>
                <InputWrapper name="end" title="End">
                    <TimeInput {...register("end", { required, disabled })} />
                </InputWrapper>
            </Group>
        </form>
    );
}
