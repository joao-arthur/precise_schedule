import { names } from "@/components/atoms/Icon";
import { FloatingButton } from "@/components/atoms/button/FloatingButton";
import { FilledText } from "@/components/atoms/typography/FilledText";

type props = {
    readonly title: string;
    readonly icon: names;
    readonly onClick: () => void;
};

export function Action({ title, icon, onClick }: props) {
    return (
        <div className="flex items-center gap-5">
            <FilledText>{title}</FilledText>
            <FloatingButton
                className="w-14 h-14"
                icon={icon}
                onClick={onClick}
            />
        </div>
    );
}
