import { ButtonIcon } from "@/components/molecules/ButtonIcon";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly title: string;
};

export function HeaderColumn({ title }: props) {
    return (
        <th className="bg-gray-100 border-l border-r border-gray-300 dark:border-gray-500 transition-colors duration-300 dark:bg-dark">
            <Text>{title}</Text>
            <ButtonIcon name="three-dots" size="medium" />
        </th>
    );
}
