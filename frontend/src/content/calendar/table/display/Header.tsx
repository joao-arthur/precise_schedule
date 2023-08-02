import { Text } from "@/components/atoms/Text";
import { useDevice } from "@/lib/device/useDevice";

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const daysOfWeekAbbrev = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

export function Header() {
    const device = useDevice();
    const isMobile = device.isMobile();

    const weekDays = isMobile ? daysOfWeekAbbrev : daysOfWeek;

    return (
        <div className="flex flex-0">
            {weekDays.map((weekDay) => (
                <div className="flex-1 overflow-hidden" key={weekDay}>
                    <Text key={weekDay}>
                        <div className="select-none text-center font-bold m-auto">
                            {weekDay}
                        </div>
                    </Text>
                </div>
            ))}
        </div>
    );
}
