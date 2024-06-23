import {
    BiCalendarPlus,
    BiCheck,
    BiChevronLeft,
    BiChevronRight,
    BiInfoCircle,
    BiPencil,
    BiSolidParty,
    BiTrash,
    BiX,
} from "react-icons/bi";
import { FaCakeCandles, FaChampagneGlasses, FaMapPin, FaUserTie } from "react-icons/fa6";
import { cl } from "@/lib/cl";

export type IconName =
    | "x"
    | "v"
    | "<"
    | ">"
    | "info"
    | "pencil"
    | "trash"
    | "calendar-plus"
    | "appointment"
    | "birthday"
    | "meeting"
    | "date"
    | "party";

export type IconSize = 6 | 9 | 14 | 20;

export type IconColor = "white" | "gray" | "green" | "red" | "prm";

type props = {
    readonly name: IconName;
    readonly size?: IconSize;
    readonly color?: IconColor;
    readonly colorDark?: IconColor;
};

export function Icon({ name, color = "prm", colorDark = "prm", size = 6 }: props) {
    const className = cl(
        "transition-colors duration-100",
        {
            "w-6 h-6": size === 6,
            "w-9 h-9": size === 9,
            "w-14 h-14": size === 14,
            "w-20 h-20": size === 20,
        },
        {
            "fill-white": color === "white",
            "fill-gray-500": color === "gray",
            "fill-red-500": color === "red",
            "fill-green-600": color === "green",
            "fill-prm": color === "prm",
            "text-drk-dk dark:text-pastel-gray": !color,
        },
        {
            "dark:fill-white": colorDark === "white",
            "dark:fill-gray-500": colorDark === "gray",
            "dark:fill-red-500": colorDark === "red",
            "dark:fill-green-600": colorDark === "green",
            "dark:fill-prm": colorDark === "prm",
        },
    );
    const props = { className };

    switch (name) {
        case "x":
            return <BiX {...props} />;
        case "v":
            return <BiCheck {...props} />;
        case "<":
            return <BiChevronLeft {...props} />;
        case ">":
            return <BiChevronRight {...props} />;
        case "info":
            return <BiInfoCircle {...props} />;
        case "pencil":
            return <BiPencil {...props} />;
        case "trash":
            return <BiTrash {...props} />;
        case "calendar-plus":
            return <BiCalendarPlus {...props} />;
        case "appointment":
            return <FaMapPin {...props} />;
        case "birthday":
            return <FaCakeCandles {...props} />;
        case "date":
            return <FaChampagneGlasses {...props} />;
        case "meeting":
            return <FaUserTie {...props} />;
        case "party":
            return <BiSolidParty {...props} />;
    }
}
