export class RepositoryError extends Error {
    constructor() {
        super("There was an error querying the data!");
    }
}
