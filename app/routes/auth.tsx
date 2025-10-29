import {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    {title: "Resume Proto | Auth"},
    {name: "description", content: "Log into your account"}
])


export const Auth = () => {
    const {isLoading, auth} = useAuth()
    const location = useLocation()
    const next = location.search.split("next=")[1]
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoading && auth.isAuthenticated) navigate(next)
    }, [auth.isAuthenticated,isLoading, next])

    async function HandleSubmitSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email') as string
        const password = form.get('password') as string
        await auth.SignIn(email, password)
    }

    let content
    if (isLoading) {
        content = <button className={"auth-button animate-pulse"}>Signing you in...</button>
    } else if (auth.isAuthenticated) {
        content =
            <button type={"submit"} className={"auth-button"} onClick={auth.SignOut}><p>Sign Out</p></button>
    } else {
        content =
            <form className={"gradient-border w-full mx-auto bg-white"} onSubmit={HandleSubmitSignIn}>
                <div className={"form-div"}>
                    <label htmlFor={"email"}>Email</label>
                    <input id={"email"} name={"email"} type={"email"} placeholder={"test@example.com"} required/>
                </div>
                <div className={"form-div"}>
                    <label htmlFor={"password"}>Password</label>
                    <input id={"password"} name={"password"} type={"password"} placeholder={"********"} required/>
                </div>
                <p className={"text-dark-200 text-sm mt-4 text-center"}>Don't have an account?</p>
                <button className={"auth-button"}><p>Sign In</p></button>
            </form>
    }

    return (
        <div className={"bg-[url('/images/bg-auth.svg')] min-h-screen bg-cover flex items-center justify-center"}>
            <div className={"gradient-border shadow-lg"}>
                <section className={"flex flex-col gap-8 bg-white rounded-2xl p-10"}>
                    <div className={"flex flex-col gap-2 text-center items-center"}>
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                    {content}
                </section>
            </div>
        </div>
    );
};

export default Auth;

