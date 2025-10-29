import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router';

export const meta = () => ([
        {title: "Resume Proto | Review"},
        {name: "description", content: "Detailed review your resume"}
    ]
)

const Resume = () => {
    const {id} = useParams()

    useEffect(() => {
        const loadResume = async () => {
            const response = await fetch('http://localhost:8080/api/resumes/' + id)
            const data = await response.json()
        }
    }, [id])

    return (
        <main className={"!pt-0"}>
            <nav className={"resume-nav"}>
                <Link to={"/"} className={"back-button"}>
                    <img src={"/icons/back.svg"} alt="logo" className={"w-2.5 h-2.5"}/>
                    <span className={"text-gray-800 text-sm font-semibold"}>Back to homepage</span>
                </Link>
            </nav>
        {/*    on mobile show top and bottom, on desktop left and right*/}
            <div className={"felx flex-row w-full max-lg:flex-col-reverse"}>
                <section className={"feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center"}>
                    {/*{ imageURL && resumeUrl && (*/}
                    {/*    <div className={"animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit"}>*/}
                    {/**/}
                    {/*    </div>*/}
                    {/*)}*/}
                </section>

            </div>
        </main>
    );
};

export default Resume;
