import Link from "next/link";

type PropsTypes = {
    error?: string
    title?: string
    children?: React.ReactNode
    link?: string
    linkText?: string
}

const AuthLayout = (props: PropsTypes) => {
    const { error, title, children, link, linkText } = props;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md grid gap-2">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">{title}</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {children}
                <p className="mt-2 text-sm text-center text-gray-600">{linkText}
                    <Link href={link || "/auth/login"} className="text-blue-600 hover:underline">{title == "Register" ? "Login" : "Register"}</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthLayout;