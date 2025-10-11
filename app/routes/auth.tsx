import {useEffect, useState} from "react";

export const meta = () => ([
    {title: "Resume Proto | Auth"},
    {name: "description", content: "Log into your account"}
])


export const Auth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    async function handleAuth() {
        // simulate 3 seconds remove on productionn
        await new Promise(resolve => setTimeout(resolve, 3000))

        let response = await fetch('http://localhost:8080/api/v1/auth/validate', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.status === 200
    }

    async function SignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')

        let response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        console.log(email, password)
        if(!response.ok) {
            const msg = await response.text()
            throw new Error(msg || "Invalid credentials")
        }
        console.log(response)
        setIsAuth(true)
    }

    const SignOut = () => {
        let response = fetch('http://localhost:8080/api/v1/auth/logout', {
           method: 'GET',
           credentials: 'include',
        })
        console.log(response)
    }

    useEffect(() => {
        let authorize = async () => {
            const isAuth = await handleAuth()
            setIsLoading(false)
            setIsAuth(isAuth)
        }
        authorize()
    }, [])
    let content
    if (isLoading) {
        content = <button className={"auth-button animate-pulse"}>Signing you in...</button>
    } else if (isAuth) {
        content =
            <button type={"submit"} className={"auth-button"} onClick={SignOut}><p>Sign Out</p></button>
    } else {
        content =
            <form className={"gradient-border w-full mx-auto bg-white"} onSubmit={SignIn}>
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

