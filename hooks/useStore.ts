import {API_BASE_URL} from "../constants";

export function useStore() {
    async function getResumeByID(uuid : string) {
        const response = await fetch(`${API_BASE_URL}/resume/${uuid}`, {
            method: "GET",
            credentials: "include",
        })
        if (!response.ok) throw new Error("Failed to fetch resume")
        return response.json()
    }

    return {
        store: {
            getResumeByID,
        }
    }
}
