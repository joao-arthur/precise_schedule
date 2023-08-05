import { FaBirthdayCake, FaChartLine, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {
    BiCalendar,
    BiChevronLeft,
    BiChevronRight,
    BiDoorOpen,
    BiDotsVerticalRounded,
    BiInfoCircle,
    BiSolidParty,
    BiTrash,
} from "react-icons/bi";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { HiFilter, HiPlusSm } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { cl } from "@/lib/cl";

export type IconName =
    | "user"
    | "cog-wheel"
    | "door"
    | "x"
    | "v"
    | "info"
    | "chart"
    | "pencil"
    | "calendar"
    | "filter"
    | "three-dots"
    | "trash"
    | "+"
    | "chevron-left"
    | "chevron-right"
    | "birthday"
    | "people"
    | "party";

type props = {
    readonly name: IconName;
    readonly className?: string;
    readonly fill?: "white" | "gray" | "primary";
    readonly size?: 6 | 9 | 14 | 20;
};

export function Icon({ name, className, fill, size }: props) {
    const composedClassName = cl(
        "transition-colors duration-500",
        {
            "fill-white": fill === "white",
            "fill-gray-500": fill === "gray",
            "fill-primary": fill === "primary",
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
        case "user":
            return <FaUserCircle {...props} />;
        case "cog-wheel":
            return <IoMdSettings {...props} />;
        case "door":
            return <BiDoorOpen {...props} />;
        case "x":
            return <RiCloseLine {...props} />;
        case "v":
            return <RiCheckLine {...props} />;
        case "info":
            return <BiInfoCircle {...props} />;
        case "chart":
            return <FaChartLine {...props} />;
        case "pencil":
            return <MdEdit {...props} />;
        case "calendar":
            return <BiCalendar {...props} />;
        case "filter":
            return <HiFilter {...props} />;
        case "three-dots":
            return <BiDotsVerticalRounded {...props} />;
        case "trash":
            return <BiTrash {...props} />;
        case "chevron-left":
            return <BiChevronLeft {...props} />;
        case "chevron-right":
            return <BiChevronRight {...props} />;
        case "+":
            return <HiPlusSm {...props} />;
        case "birthday":
            return <FaBirthdayCake {...props} />;
        case "people":
            return <BiSolidParty {...props} />;
        case "party":
            return <BsPeopleFill {...props} />;
    }
}
