import { useCallback } from "react";
import { device } from "./device";
import { useWindowSize } from "usehooks-ts";

export function useDevice() {
    const dimensions = useWindowSize();
    const isMobile = useCallback(
        () => device.isMobile(dimensions),
        [dimensions],
    );
    const isDesktop = useCallback(
        () => device.isDesktop(dimensions),
        [dimensions],
    );
    return { isMobile, isDesktop };
}
