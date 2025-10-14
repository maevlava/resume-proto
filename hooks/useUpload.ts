
export function useUpload() {
    async function Upload(companyName: string, jobTitle: string, jobDescription: string, file: File) {
        const form = new FormData()
        form.append("company_name", companyName)
        form.append("job_title", jobTitle)
        form.append("job_description", jobDescription)
        form.append("file", file)

        const response = await fetch("http://localhost:8080/api/v1/upload", {
            method: "POST",
            credentials: "include",
            body: form,
        })

        console.log(response.status)
    }
    return {
        uploader: {
            Upload
        }
    }
}