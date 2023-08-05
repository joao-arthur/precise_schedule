import { Text } from "../../atoms/Text";
import { ErrorBadge } from "../badge/ErrorBadge";
import { SuccessBadge } from "../badge/SuccessBadge";

type props = {
    readonly valid: boolean;
    readonly label: string;
};

export function Badge({ valid, label }: props) {
    return (
        <div className="flex items-center gap-2">
            {valid ? <SuccessBadge /> : <ErrorBadge />}
            <Text size="sm">{label}</Text>
        </div>
    );
}
