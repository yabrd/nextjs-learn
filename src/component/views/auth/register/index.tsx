import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/component/ui/Input";
import Button from "@/component/ui/Button";

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
                    <Input label="Full Name" id="fullname" name="fullname" type="fullname" placeholder="Enter your full name" />
                    <Input label="Email" id="email" name="email" type="email" placeholder="Enter your email" />
                    <Input label="Phone Number" id="phone" name="phone" type="phone" placeholder="Enter your phone number" />
                    <Input label="Password" id="password" name="password" type="password" placeholder="Enter your password" />
                    <Button type="submit" OnClick={() => {}}>{isLoading ? "..." : "Register"}</Button>
                </form>
                <p className="mt-2 text-sm text-center text-gray-600">Already have an account?{" "}
                    <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterView;
