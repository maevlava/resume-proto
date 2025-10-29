import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { ResumeCard } from "~/components/ResumeCard";
import {useAuth} from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume-proto" },
    { name: "description", content: "Smart feedback for resumes" },
  ];
}

export default function Home() {
  const {isLoading, auth} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!auth.isAuthenticated && !isLoading) navigate("/auth?next=/")
  }, [auth.isAuthenticated, isLoading])

  return <main className={"min-h-screen bg-[url('/images/bg-main.svg')] bg-cover"}>
    <Navbar/>

    <section className={"main-section"}>
      <div className={"page-heading"}>
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>

    { resumes.length > 0 && (
     <div className={"resumes-section"}>
       {resumes.map((resume) => (
           <ResumeCard key={resume.id} resume={resume}/>
       ))}
     </div>
    )}
    </section>

  </main>
}
