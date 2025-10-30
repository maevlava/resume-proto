import {API_BASE_URL} from "../constants";
import {useMemo} from "react";

export function useStore() {
    const store = useMemo(() => {
        return {
            getResumeByID,
        }
    }, [])

    return {store}
}
async function getResumeByID(uuid : string) {
    console.log(uuid)
    const response = await fetch(`${API_BASE_URL}/resume/${uuid}`, {
        method: "GET",
        credentials: "include",
    })
    if (!response.ok) throw new Error("Failed to fetch resume")
    return response.json()
}
