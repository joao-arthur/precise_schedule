import type { Event } from "frontend_core";
import { Icon } from "@/components/atoms/Icon";

type props = {
    readonly event: Event;
};

export function IconEventBuilder({ event }: props) {
    switch (event.category) {
        case "APPOINTMENT":
            return <Icon name="appointment" />;
        case "BIRTHDAY":
            return <Icon name="birthday" />;
        case "DATE":
            return <Icon name="date" />;
        case "MEETING":
            return <Icon name="meeting" />;
        case "PARTY":
            return <Icon name="party" />;
    }
}
