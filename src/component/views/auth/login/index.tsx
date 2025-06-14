const LoginView = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">Don&apos;t have an account? {' '}
                    <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginView;