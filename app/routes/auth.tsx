export const meta = () => ([
    { title: "Resume Proto | Auth"},
    { name: "description", content: "Log into your account"}
])


export const Auth = () => {
    // check auth loading, auth

    return (
        <div className={"bg-[url('/images/bg-auth.svg')] min-h-screen bg-cover flex items-center justify-center"}>
            <div className={"gradient-border shadow-lg"}>
                <section className={"flex flex-col gap-8 bg-white rounded-2xl p-10"}>
                    <div className={"flex flex-col gap-2 text-center items-center"}>
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                {/*    if loading render loading button*/}
                {/*    if not loading, and not auth render sign in button*/}
                {/*    if not loading, and auth render sign out button*/}
                </section>
            </div>
        </div>
    );
};

export default Auth;
