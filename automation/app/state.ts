export class State {
    private static state: State | null = null;
    public token: string | undefined = undefined;

    public static getState(): State {
        if (State.state === null) {
            State.state = new State();
        }
        return State.state;
    }

    public getToken(): string | undefined {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }
}
