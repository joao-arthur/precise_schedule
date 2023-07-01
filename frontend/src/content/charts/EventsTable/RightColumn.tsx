import type { ReactNode } from "react";
import { Text } from "@/components/atoms/typography/Text";

type props = {
    readonly children: ReactNode;
};

export function RightColumn({ children }: props) {
    return (
        <th className="border border-gray-300 dark:border-gray-500 px-1 font-normal text-sm transition-colors duration-500">
            <Text>{children}</Text>
        </th>
    );
}
