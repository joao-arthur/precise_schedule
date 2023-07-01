import type { Session } from "./session";
import { useSession } from "@/features/session/useSession";
import { useLocalStorage } from "@/lib/storage/useLocalStorage";

type SessionManager = {
    readonly init: () => void;
    readonly log: (session: Session) => void;
    readonly unlog: () => void;
};

export function useSessionManager(): SessionManager {
    const { getItem, setItem, removeItem } = useLocalStorage<
        Session["token"]
    >("token");
    const sessionStore = useSession();

    function init() {
        const maybeToken = getItem();
        if (maybeToken) {
            sessionStore.log();
        } else {
            sessionStore.unlog();
        }
    }

    function log(session: Session) {
        sessionStore.log();
        setItem(session.token);
    }

    function unlog() {
        sessionStore.unlog();
        removeItem();
    }

    return { init, log, unlog };
}
