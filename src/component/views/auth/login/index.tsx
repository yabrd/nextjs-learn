import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/component/ui/Input";
import Button from "@/component/ui/Button";
import AuthLayout from "@/component/layouts/Auth";

const LoginView = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const { push, query } = useRouter();
    const callbackUrl: any = query.callbackUrl || "/";

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        const form = event.target as HTMLFormElement;
        try {
            const res = await signIn("credentials", { 
                redirect: false,
                email: form.email.value,
                password: form.password.value,
                callbackUrl
            });
            if (!res?.error) {
                setIsLoading(false);
                form.reset();
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Invalid email or password");
            }
        } catch {
            setIsLoading(false);
            setError("Invalid email or password");
        }
    };

    return (
        <AuthLayout title="Login" link="/auth/register" linkText="Don't have an account? " error={error}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Email" id="email" name="email" type="email" placeholder="Enter your email" />
                    <Input label="Password" id="password" name="password" type="password" placeholder="Enter your password" />
                    <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
                </form>
                    <Button type="button" OnClick={() => signIn("google", { callbackUrl, redirect: false })}>
                        <svg className="w-5 h-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path fill="#EA4335" d="M488 261.8c0-17.8-1.5-35-4.3-51.7H249v97.9h134.1c-5.8 31.3-23 57.9-49 75.8v62.7h79.4c46.4-42.7 74.5-105.5 74.5-184.7z" />
                            <path fill="#34A853" d="M249 510c66.4 0 122.3-22 163-59.7l-79.4-62.7c-22.2 14.9-50.8 23.7-83.6 23.7-64.3 0-118.8-43.4-138.4-101.8H29.5v63.8C69.3 454 152.6 510 249 510z" />
                            <path fill="#4A90E2" d="M110.6 309.5c-4.7-14-7.4-28.9-7.4-44.5s2.7-30.5 7.4-44.5v-63.8H29.5C10.6 196.8 0 221.3 0 255s10.6 58.2 29.5 79.8l81.1-25.3z" />
                            <path fill="#FBBC05" d="M249 100.9c36.1 0 68.6 12.4 94.1 36.7l70.4-70.4C371.3 29.5 315.4 0 249 0 152.6 0 69.3 56 29.5 142.2l81.1 63.8C130.2 144.3 184.7 100.9 249 100.9z"/>
                        </svg>
                        Google Account
                    </Button>
        </AuthLayout>
    );
};

export default LoginView;