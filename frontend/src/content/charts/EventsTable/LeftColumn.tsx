import type { ReactNode } from "react";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly children: ReactNode;
};

export function LeftColumn({ children }: props) {
    return (
        <th className="border border-gray-300 dark:border-gray-500 px-1 text-left font-normal transition-colors duration-500">
            <Text>{children}</Text>
        </th>
    );
}
