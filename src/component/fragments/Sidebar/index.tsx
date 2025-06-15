import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type PropsTypes = {
    lists: Array<{
        name: string;
        url: string;
        icon: string;
    }>;
};

const Sidebar = (props: PropsTypes) => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const { lists } = props;

    const handleAuth = async () => {
        setIsLoading(true);
        try {
            if (session) { await signOut() }
            else { await signIn() }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col justify-between">
            {/* Bagian Atas - Navigation */}
            <div>
                <h1 className="text-2xl font-bold mb-6">Sidebar</h1>
                <nav className="space-y-2">
                    {lists.map((list, index) => (
                        <a
                            key={index}
                            href={list.url}
                            className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-base font-medium"
                        >
                            <i className={`bx ${list.icon} text-xl`}></i>
                            {list.name}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Bagian Bawah - Tombol Login/Logout */}
            <button
                onClick={handleAuth}
                disabled={isLoading}
                className="flex p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-base font-medium w-full"
            >
                <i className={`bx ${session ? "bx-log-out" : "bx-log-in"} text-xl`}></i>
                {isLoading ? "Loading..." : session ? "Logout" : "Login"}
            </button>
        </div>
    );
};

export default Sidebar;
