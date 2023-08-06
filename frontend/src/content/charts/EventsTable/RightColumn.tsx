import type { ReactNode } from "react";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly children: ReactNode;
};

export function RightColumn({ children }: props) {
    return (
        <th className="border border-gray-300 dark:border-gray-500 px-1 font-normal transition-colors duration-300">
            <Text size="sm">{children}</Text>
        </th>
    );
}
