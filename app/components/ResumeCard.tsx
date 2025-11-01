import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {STATIC_BASE_URL} from "../../constants";

export const ResumeCard = ({resume: {id, jobTitle, companyName, feedback, imagePath}}: { resume: Resume }) => {
    return (
        <Link to={`/resume/${id}`} className={"resume-card animate-in fade-in duration-1000"}>
            <div className={"resume-card-header py-16"}>
                <div className={"flex flex-col gap-2"}>
                    {companyName && <h2 className={"!text-black font-bold break-words"}>{companyName}</h2>}
                    {jobTitle && <h3 className={"!text-gray-500 text-lg break-words"}>{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h3 className={"!text-black font-bold"}>Resume</h3>}
                </div>
                <div className={"flex-shrink-0"}>
                    <ScoreCircle score={feedback!!.overallScore}/>
                </div>
            </div>
            <div className={"gradient-border animate-in fade-in duration-1000"}>
                <div className={"w-full h-full"}>
                    <img src={STATIC_BASE_URL + '/' + imagePath!!}
                         alt={"resume"}
                         className={"w-full h-[350px] max-sm:h-[250px] object-cover object-top"}/>
                </div>
            </div>
        </Link>
    );
};
