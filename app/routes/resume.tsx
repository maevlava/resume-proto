import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router';
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import {useStore} from "../../hooks/useStore";
import {STATIC_BASE_URL} from "../../constants";
import {useAuth} from "../../hooks/useAuth";

export const meta = () => ([
        {title: "Resume Proto | Review"},
        {name: "description", content: "Detailed review your resume"}
    ]
)

const Resume = () => {
    const {store} = useStore()
    const {auth, isLoading} = useAuth()
    const {id} = useParams()
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [resumeURL, setResumeURL] = useState<string | null>(null)
    const [feedback, setFeedback] = useState<Feedback | null>(null)
    const navigate = useNavigate()


    useEffect(() => {
        if (!auth.isAuthenticated && !isLoading) navigate(`/auth?next=/resume/${id}`)
    }, [auth.isAuthenticated, isLoading])

    useEffect(() => {
        if (!id) return
        (async () => {
            const resume: Resume = await store.getResumeByID(id)
            setResumeURL(resume.pdfPath)
            setImageURL(resume.imagePath)
            setFeedback(resume.feedback)
            console.log(resume)
        })()
    }, [id, store])

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5"/>
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section
                    className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageURL && resumeURL && (
                        <div
                            className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={STATIC_BASE_URL + '/' + resumeURL} target="_blank" rel="noopener noreferrer">
                                <img
                                    alt="resume"
                                    src={STATIC_BASE_URL + '/' + imageURL}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback}/>
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" alt={"resume-scan"} className="w-full"/>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;