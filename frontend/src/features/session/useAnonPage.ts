import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "./useSession";

export function useAnonPage(): void {
    const logged = useSession((state) => state.logged());
    const { replace } = useRouter();

    useEffect(() => {
        if (logged) {
            replace("/");
        }
    }, [logged, replace]);
}
