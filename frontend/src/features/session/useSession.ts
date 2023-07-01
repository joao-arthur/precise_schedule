import { create } from "zustand";

// TODO state machine
type UserSession = {
    readonly state: "INITIAL" | "LOGGED" | "UNLOGGED";
    readonly logged: () => boolean;
    readonly unlogged: () => boolean;
    readonly log: () => void;
    readonly unlog: () => void;
};

export const useSession = create<UserSession>((set, get) => ({
    state: "INITIAL",
    logged: () => get().state === "LOGGED",
    unlogged: () => get().state === "UNLOGGED",
    log: () => set({ state: "LOGGED" }),
    unlog: () => set({ state: "UNLOGGED" }),
}));
