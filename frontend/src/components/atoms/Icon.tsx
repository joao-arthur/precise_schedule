import { FaChartLine, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {
    BiCalendar,
    BiChevronLeft,
    BiChevronRight,
    BiChevronsLeft,
    BiChevronsRight,
    BiDoorOpen,
    BiDotsVerticalRounded,
    BiInfoCircle,
    BiTrash,
} from "react-icons/bi";
import { RiCloseLine, RiMenuAddFill } from "react-icons/ri";
import { HiFilter } from "react-icons/hi";
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
    | "add"
    | "chevron-left"
    | "chevron-right"
    | "double-chevron-left"
    | "double-chevron-right";

type props = {
    readonly name: names;
    readonly size: number;
    readonly color?: string;
    readonly className?: string;
};

export function Icon(
    { name, size, color, className }: props,
) {
    const style = { height: size, width: size, fill: color };

    const props = { className, style };

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
        case "double-chevron-left":
            return <BiChevronsLeft {...props} />;
        case "double-chevron-right":
            return <BiChevronsRight {...props} />;
        case "add":
            return <RiMenuAddFill {...props} />;
    }
}
