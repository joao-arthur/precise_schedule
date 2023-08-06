import type { ReactNode } from "react";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly children: ReactNode;
};

export function CenterColumn({ children }: props) {
    return (
        <th className="border border-gray-300 dark:border-gray-500 px-1 text-center font-normal transition-colors duration-300">
            <Text>{children}</Text>
        </th>
    );
}
