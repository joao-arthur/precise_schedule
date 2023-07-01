import { FaChartLine, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {
    BiCalendar,
    BiChevronLeft,
    BiChevronRight,
    BiDoorOpen,
    BiDotsVerticalRounded,
    BiInfoCircle,
    BiTrash,
} from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { HiFilter, HiPlusSm } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

export type names =
    | "user"
    | "settings"
    | "signOut"
    | "close"
    | "info"
    | "chart"
    | "edit"
    | "calendar"
    | "filter"
    | "threeDots"
    | "trash"
    | "plus"
    | "chevron-left"
    | "chevron-right";

type props = {
    readonly name: names;
    readonly className: string;
};

export function Icon({ name, className }: props) {
    const props = { className };

    switch (name) {
        case "user":
            return <FaUserCircle {...props} />;
        case "settings":
            return <IoMdSettings {...props} />;
        case "signOut":
            return <BiDoorOpen {...props} />;
        case "close":
            return <RiCloseLine {...props} />;
        case "info":
            return <BiInfoCircle {...props} />;
        case "chart":
            return <FaChartLine {...props} />;
        case "edit":
            return <MdEdit {...props} />;
        case "calendar":
            return <BiCalendar {...props} />;
        case "filter":
            return <HiFilter {...props} />;
        case "threeDots":
            return <BiDotsVerticalRounded {...props} />;
        case "trash":
            return <BiTrash {...props} />;
        case "chevron-left":
            return <BiChevronLeft {...props} />;
        case "chevron-right":
            return <BiChevronRight {...props} />;
        case "plus":
            return <HiPlusSm {...props} />;
    }
}
