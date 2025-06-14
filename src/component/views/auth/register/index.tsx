import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const { push } = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        const form = event.target as HTMLFormElement;
        const data = {
            fullname: form.fullname.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value,
        };

        const result = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            form.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(result.statusText);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullname"className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" id="fullname" className="w-full bg-white text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" className="w-full bg-white text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" id="phone" className="w-full bg-white text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" className="w-full bg-white text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
                        {isLoading ? "..." : "Register"}
                    </button>
                </form>

                {/* Link to Login */}
                <p className="mt-4 text-sm text-center text-gray-600">Already have an account?{" "}
                    <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterView;
