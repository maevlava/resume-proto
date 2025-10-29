import Navbar from "~/components/Navbar";
import {useEffect, useState} from "react";
import {FileUploader} from "~/components/FileUploader";
import {useUpload} from "../../hooks/useUpload";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router";
import {generateUUID} from "~/utils";

const Upload = () => {
    const {isLoading, auth} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isAuthenticated && !isLoading) navigate("/auth?next=/")
    }, [auth.isAuthenticated, isLoading])

    const {uploader} = useUpload()
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if (!form) return;
        const formData = new FormData(form)

        const companyName = formData.get('company-name') as string
        const jobTitle = formData.get('job-title') as string
        const jobDescription = formData.get('job-description') as string

        console.log(companyName, jobTitle, jobDescription, file)
        handleAnalyze({companyName, jobTitle, jobDescription, file: file as File}).then(() => {
            console.log("done")
        })
    }
    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {
        companyName: string,
        jobTitle: string,
        jobDescription: string,
        file: File
    }) => {
        setIsProcessing(true)

        setStatusText("Uploading resume...")
        let response = await uploader.Upload(companyName, jobTitle, jobDescription, file as File)
        if (!response.ok) {
            setStatusText("Resume analysis failed")
            setIsProcessing(false)
            return
        }
        let resume = await response.json()
        console.log(resume)


        setStatusText("Analyzing resume...")
        const AIFeedback = await uploader.AIFeedback(resume.resumeID)
        if (!AIFeedback.ok) {
            setStatusText("Resume analysis failed")
            setIsProcessing(false)
            return
        }
        resume = await AIFeedback.json()

        setStatusText("Analysis complete!")
        setIsProcessing(false)

        navigate(`/resume/${resume.resumeID}`)
    }

    let content
    if (isProcessing) {
        content =
            <>
                <h2>{statusText}</h2>
                <img src={"/images/resume-scan.gif"} alt={"loading"} className={"w-full"}/>
            </>
    } else {
        content = <h2>Drop your resume for an ATS score and improvement tips</h2>
    }
    return (
        <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
            <Navbar/>
            <section className={"main-section"}>
                <div className={"page-heading"}>
                    <h1>Smart feedback for your dream&nbsp;job</h1>
                    {content}
                    {(!isProcessing && (
                        <form id={"upload-form"} onSubmit={handleSubmit} className={"w-full flex flex-col gap-4"}>
                            <div className={"form-div"}>
                                <label htmlFor={"company-name"}>Company name</label>
                                <input id={"company-name"} name={"company-name"} type={"text"}
                                       placeholder={"Company Name"}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"job-title"}>Job title</label>
                                <input id={"job-title"} name={"job-title"} type={"text"} placeholder={"Job Title"}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"job-description"}>Job Description</label>
                                <textarea rows={5} id={"job-description"} name={"job-description"}
                                          placeholder={"Job Description"}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"uploader"}>Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect}/>
                            </div>
                            <button type={"submit"} className={"primary-button"}>Analyze Resume</button>
                        </form>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Upload;
