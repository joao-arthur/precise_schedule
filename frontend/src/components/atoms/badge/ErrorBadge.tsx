import { Badge } from "./Badge";

export function ErrorBadge() {
    return (
        <Badge
            className="border-red-500 bg-red-50"
            iconName="x"
            iconClassName="fill-red-500 w-5 h-5"
        />
    );
}