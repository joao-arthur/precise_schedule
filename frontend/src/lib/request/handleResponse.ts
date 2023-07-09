export async function handleResponse(response: Response) {
    if (response.status === 200) {
        const json = await response.json();
        return json;
    }
    if (response.status === 201) {
        return undefined;
    }
    if (response.status === 204) {
        return undefined;
    }
    if (response.status === 400) {
        const json = await response.json();
        throw json;
    }
    if (response.status === 401) {
        throw response;
    }
    if (response.status === 500) {
        const json = await response.json();
        throw json;
    }
}
