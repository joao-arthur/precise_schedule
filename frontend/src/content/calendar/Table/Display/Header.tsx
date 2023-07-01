import { Text } from "@/components/atoms/typography/Text";
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

    const days = isMobile ? daysOfWeekAbbrev : daysOfWeek;

    return (
        <div className="flex flex-0">
            {days.map((day) => (
                <Text className="flex-1 overflow-hidden" key={day}>
                    <div className="select-none text-center font-bold m-auto">
                        {day}
                    </div>
                </Text>
            ))}
        </div>
    );
}
