import clss from "classnames";
import { Icon, names } from "@/components/atoms/Icon";

type props = {
    readonly className: string;
    readonly icon: names;
    readonly onClick: () => void;
};

export function FloatingButton({ className, icon, onClick }: props) {
    return (
        <button
            onClick={onClick}
            className="rounded-full bg-primary active:bg-primary-dark shadow-gray-800 shadow-md"
        >
            <Icon
                name={icon}
                className={clss("fill-white p-3", className)}
            />
        </button>
    );
}
