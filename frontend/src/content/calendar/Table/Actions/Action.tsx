import { names } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { FloatingButton } from "@/components/atoms/button/FloatingButton";
import { FilledText } from "@/components/atoms/typography/FilledText";

type props = {
    readonly title: string;
    readonly icon: names;
    readonly link: string;
};

export function Action({ title, icon, link }: props) {
    return (
        <div className="flex items-center gap-3">
            <FilledText>{title}</FilledText>
            <Link to={link}>
                <FloatingButton
                    className="w-16 h-16"
                    icon={icon}
                />
            </Link>
        </div>
    );
}
