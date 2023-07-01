import { useEffect, useState } from "react";
import { Modal } from "@/components/modal/Modal";
import { ModalForm } from "@/components/organisms/ModalForm";
import { Field } from "@/components/molecules/Field";
import { Group } from "@/components/atoms/layout/Group";
import {
    categoryType,
    eventType,
    repeatFrequencyType,
} from "../../eventType";
import { eventModel } from "./eventModel";
import { categoryOptions } from "./categoryOptions";
import { repeatFrequencyOptions } from "./repeatFrequencyOptions";

type props = {
    readonly visible: boolean;
    readonly hide: () => void;
    readonly model: eventModel;
    readonly onSubmit: (event: Omit<eventType, "id">) => void;
    readonly type: "NEW" | "EDIT" | "INFO";
};

export function EventRegister(
    { visible, hide, model, onSubmit, type }: props,
) {
    const [name, setName] = useState(model.name.defaultValue);
    const [category, setCategory] = useState<categoryType>(
        model.category.defaultValue,
    );
    const [frequency, setFrequency] = useState<repeatFrequencyType>(
        model.frequency.defaultValue,
    );
    const [weekendRepeat, setWeekendRepeat] = useState(
        model.weekendRepeat.defaultValue,
    );
    const [startDate, setStartDate] = useState<Date | null>(
        model.startDate.defaultValue,
    );
    const [startTime, setStartTime] = useState(
        model.startTime.defaultValue,
    );
    const [endDate, setEndDate] = useState<Date | null>(
        model.endDate.defaultValue,
    );
    const [endTime, setEndTime] = useState(
        model.endTime.defaultValue,
    );
    const [browserNotification, setBrowserNotification] = useState(
        model.browserNotification.defaultValue,
    );
    const [emailNotification, setEmailNotification] = useState(
        model.emailNotification.defaultValue,
    );
    const repeats = frequency !== "NEVER";
    const isBirthday = category === "BIRTHDAY";

    useEffect(() => {
        if (isBirthday) {
            setStartTime("00:00");
            setEndTime("23:59");
            setFrequency("1_Y");
        }
    }, [isBirthday]);

    function handleSubmit() {
        onSubmit({
            name,
            category,
            frequency,
            weekendRepeat,
            start: new Date(
                startDate?.getFullYear() || 0,
                startDate?.getMonth() || 0,
                startDate?.getDate() || 0,
                Number(startTime.split(":")[0]),
                Number(startTime.split(":")[1]),
            ).toISOString(),
            end: new Date(
                endDate?.getFullYear() || 0,
                endDate?.getMonth() || 0,
                endDate?.getDate() || 0,
                Number(endTime.split(":")[0]),
                Number(endTime.split(":")[1]),
            ).toISOString(),
            browserNotification,
            emailNotification,
        });
    }

    useEffect(() => {
        if (isBirthday || !["1_D", "2_D"].includes(frequency)) {
            setWeekendRepeat(false);
        }
    }, [isBirthday, frequency]);

    return (
        <Modal
            visible={visible}
            title={model.title}
            onCancel={hide}
            onConfirm={type !== "INFO" ? handleSubmit : undefined}
        >
            <ModalForm onSubmit={handleSubmit}>
                <Field
                    type="text"
                    title="Name"
                    name="name"
                    value={name}
                    onChange={setName}
                    required
                    readOnly={model.name.readOnly}
                />
                <Group>
                    <Field
                        type="select"
                        title="Category"
                        name="category"
                        options={categoryOptions}
                        value={category}
                        onChange={(newCategory) =>
                            setCategory(newCategory as categoryType)}
                        readOnly={model.category.readOnly}
                    />
                </Group>
                <Group>
                    <Field
                        type="date"
                        title="Date Start"
                        name="datestart"
                        value={startDate}
                        onChange={setStartDate}
                        required
                        readOnly={model.startDate.readOnly}
                    />
                    <Field
                        type="time"
                        title="Time Start"
                        name="timestart"
                        value={startTime}
                        onChange={setStartTime}
                        required
                        readOnly={isBirthday ||
                            model.startTime.readOnly}
                    />
                </Group>
                <Group>
                    <Field
                        type="date"
                        title="Date end"
                        name="dateend"
                        value={endDate}
                        onChange={setEndDate}
                        required
                        readOnly={model.endDate.readOnly}
                    />
                    <Field
                        type="time"
                        title="Time end"
                        name="timeend"
                        value={endTime}
                        onChange={setEndTime}
                        required
                        readOnly={isBirthday ||
                            model.endTime.readOnly}
                    />
                </Group>
                <Group>
                    <Field
                        type="toggle"
                        title="Repeats"
                        name="repeats"
                        value={repeats}
                        onChange={() =>
                            setFrequency(
                                repeats
                                    ? "NEVER"
                                    : isBirthday
                                    ? "1_Y"
                                    : "1_M",
                            )}
                        readOnly={model.repeats.readOnly}
                    />
                    <Field
                        type="toggle"
                        title="Repeats on weekend"
                        name="weekendRepeat"
                        value={weekendRepeat}
                        onChange={setWeekendRepeat}
                        readOnly={model.weekendRepeat.readOnly}
                        invisible={isBirthday ||
                            !["1_D", "2_D"].includes(frequency)}
                    />
                </Group>
                <Field
                    type="select"
                    title="Frequency"
                    name="frequency"
                    options={repeatFrequencyOptions}
                    value={frequency}
                    onChange={(newFrequency) =>
                        setFrequency(
                            newFrequency as repeatFrequencyType,
                        )}
                    readOnly={isBirthday || model.frequency.readOnly}
                    invisible={!repeats && !isBirthday}
                />
                <Group>
                    <Field
                        type="toggle"
                        title="Notificate on browser"
                        name="browserNotification"
                        value={browserNotification}
                        onChange={setBrowserNotification}
                        readOnly={model.browserNotification.readOnly}
                    />
                    <Field
                        type="toggle"
                        title="Notificate on email"
                        name="emailNotification"
                        value={emailNotification}
                        onChange={setEmailNotification}
                        readOnly={model.emailNotification.readOnly}
                    />
                </Group>
            </ModalForm>
        </Modal>
    );
}
