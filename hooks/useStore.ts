import {API_BASE_URL} from "../constants";
import {useMemo} from "react";

export function useStore() {
    const store = useMemo(() => {
        return {
            getResumeByID,
            getResumes,
        }
    }, [])

    return {store}
}
async function getResumeByID(uuid : string) {
    const response = await fetch(`${API_BASE_URL}/resume/${uuid}`, {
        method: "GET",
        credentials: "include",
    })
    if (!response.ok) throw new Error("Failed to fetch resume")
    return response.json()
}
async function getResumes() {
    const response = await fetch(`${API_BASE_URL}/auth/me/resumes`, {
        method: "GET",
        credentials: "include",
    })
    if (!response.ok) throw new Error("Failed to fetch resumes")
    return response.json()
}
