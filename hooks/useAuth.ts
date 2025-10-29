import {useEffect, useState} from "react";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    async function validate() {
        const res = await fetch("http://localhost:8080/api/v1/auth/validate", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.status === 200
    }
    useEffect(() => {
        (async () => {
            const ok = await validate()
            setIsAuthenticated(ok)
            setIsLoading(false)
        })()
    }, [])

    async function SignIn(email: string, password: string) {
        const res = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        if(!res.ok) {
            const msg = await res.text()
            throw new Error(msg || "Invalid credentials")
        }
        setIsAuthenticated(true)
    }
    async function SignOut () {
        const res = await fetch("http://localhost:8080/api/v1/auth/logout", {
            method: "GET",
            credentials: "include",
        })
        if(!res.ok) {
            const msg = await res.text()
            console.log(msg)
        }
        setIsAuthenticated(false)
    }
    return {
        isLoading,
        auth: {
            isAuthenticated,
            SignIn,
            SignOut
        },
    }
}
