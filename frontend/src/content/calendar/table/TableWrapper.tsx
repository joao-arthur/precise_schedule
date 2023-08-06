import type { ReactNode } from "react";
import { useDevice } from "@/lib/device/useDevice";

type props = {
    readonly children: ReactNode;
};

export function TableWrapper({ children }: props) {
    const isMobile = useDevice().isMobile();

    return isMobile
        ? (
            <div className="flex flex-initial overflow-hidden w-full h-full">
                <div className="flex flex-grow-0">
                    <div className="flex flex-grow w-screen flex-col">
                        {children}
                    </div>
                </div>
            </div>
        )
        : (
            <div className="flex flex-col overflow-hidden w-full h-full">
                {children}
            </div>
        );
}
