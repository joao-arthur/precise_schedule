import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "./useSession";

export function useAuthPage(): void {
    const unlogged = useSession((state) => state.unlogged());
    const { replace } = useRouter();

    useEffect(() => {
        if (unlogged) {
            replace("/signin");
        }
    }, [unlogged, replace]);
}
