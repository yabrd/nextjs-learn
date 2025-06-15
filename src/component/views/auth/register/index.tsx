import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { authServices } from "@/services/auth";
import Input from "@/component/ui/Input";
import Button from "@/component/ui/Button";
import AuthLayout from "@/component/layouts/Auth";

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

        const result = await authServices.registerAccount(data);

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
        <AuthLayout title="Register" link="/auth/login" linkText="Already have an account? " error={error}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Full Name" id="fullname" name="fullname" type="fullname" placeholder="Enter your full name" />
                    <Input label="Email" id="email" name="email" type="email" placeholder="Enter your email" />
                    <Input label="Phone Number" id="phone" name="phone" type="phone" placeholder="Enter your phone number" />
                    <Input label="Password" id="password" name="password" type="password" placeholder="Enter your password" />
                    <Button type="submit" OnClick={() => {}}>{isLoading ? "..." : "Register"}</Button>
                </form>
        </AuthLayout>
    );
};

export default RegisterView;
