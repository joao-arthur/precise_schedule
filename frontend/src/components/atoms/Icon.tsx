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

export type IconName =
    | "user"
    | "cog-wheel"
    | "door"
    | "x"
    | "check"
    | "info"
    | "chart"
    | "pencil"
    | "calendar"
    | "filter"
    | "three-dots"
    | "trash"
    | "plus"
    | "chevron-left"
    | "chevron-right"
    | "birthday"
    | "people"
    | "party";

type props = {
    readonly name: IconName;
    readonly className: string;
};

export function Icon({ name, className }: props) {
    const props = { className };

    switch (name) {
        case "user":
            return <FaUserCircle {...props} />;
        case "cog-wheel":
            return <IoMdSettings {...props} />;
        case "door":
            return <BiDoorOpen {...props} />;
        case "x":
            return <RiCloseLine {...props} />;
        case "check":
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
        case "plus":
            return <HiPlusSm {...props} />;
        case "birthday":
            return <FaBirthdayCake {...props} />;
        case "people":
            return <BiSolidParty {...props} />;
        case "party":
            return <BsPeopleFill {...props} />;
    }
}
