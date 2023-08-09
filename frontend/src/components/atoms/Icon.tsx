import {
    BiCheck,
    BiChevronLeft,
    BiChevronRight,
    BiInfoCircle,
    BiPencil,
    BiTrash,
    BiX,
} from "react-icons/bi";
import { cl } from "@/lib/cl";

export type IconName =
    | "x"
    | "v"
    | "<"
    | ">"
    | "info"
    | "pencil"
    | "trash";

type props = {
    readonly name: IconName;
    readonly className?: string;
    readonly fill?: "white" | "gray";
    readonly size?: 6 | 9 | 14 | 20;
};

export function Icon({ name, className, fill, size }: props) {
    const composedClassName = cl(
        "transition-colors duration-100",
        {
            "fill-white": fill === "white",
            "fill-gray-500": fill === "gray",
        },
        {
            "w-6 h-6": size === 6,
            "w-9 h-9": size === 9,
            "w-14 h-14": size === 14,
            "w-20 h-20": size === 20,
        },
        className,
    );
    const props = { className: composedClassName };

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
    }
}
