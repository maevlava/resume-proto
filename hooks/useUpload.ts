
export function useUpload() {
    async function Upload(companyName: string, jobTitle: string, jobDescription: string, file: File) {
        const form = new FormData()
        form.append("jobTitle", jobTitle)
        form.append("jobDescription", jobDescription)
        form.append("companyName", companyName)
        form.append("file", file)

        const response = await fetch("http://localhost:8080/api/v1/upload", {
            method: "POST",
            credentials: "include",
            body: form,
        })

        return response
    }
    async function AIFeedback(resumeID: string) {
        const response = await fetch(`http://localhost:8080/api/v1/ai/analyze/${resumeID}`, {
            method: "POST",
            credentials: "include",
        })
        return response
    }


    return {
        uploader: {
            Upload,
            AIFeedback,
        }
    }
}
