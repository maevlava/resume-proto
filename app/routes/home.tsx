import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import {ResumeCard} from "~/components/ResumeCard";
import {useAuth} from "../../hooks/useAuth";
import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useStore} from "../../hooks/useStore";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Resume-proto"},
        {name: "description", content: "Smart feedback for resumes"},
    ];
}

export default function Home() {
    const {store} = useStore()
    const [resumes, setResumes] = useState<Resume[]>([])
    const {isLoading, auth} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isAuthenticated && !isLoading) navigate("/auth?next=/")
    }, [auth.isAuthenticated, isLoading])

    useEffect(() => {
        (async () => {
            const resumes = await store.getResumes()
            setResumes(resumes)
        })()
    }, [])

    return <main className={"min-h-screen bg-[url('/images/bg-main.svg')] bg-cover"}>
        <Navbar/>

        <section className={"main-section"}>
            <div className={"page-heading py-16"}>
                <h1>Track Your Applications & Resume Ratings</h1>
                {!isLoading && resumes.length === 0 ? (
                    <h2>No resumes found. Upload your first resume to get feedback.</h2>
                ) : (
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                )}
            </div>
            {isLoading && (
                <div className={"flex flex-col items-center justify-center"}>
                    <img src={"/images/resume-scan-2.gif"} alt={"loading"} className={"w-[200px]"}/>
                </div>
            )}

            {resumes.length > 0 && (
                <div className={"resumes-section"}>
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume}/>
                    ))}
                </div>
            )}

            {!isLoading && resumes.length === 0 && (
                <div className={"flex flex-col items-center justify-center mt-10 gap-4"}>
                    <Link to={"/upload"} className={"primary-button w-fit text-xl font-semibold"}>
                        Upload Resume
                    </Link>
                </div>
            )}
        </section>

    </main>
}
