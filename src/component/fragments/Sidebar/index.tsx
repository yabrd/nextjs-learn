"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    const pathname = usePathname();

    const handleAuth = async () => {
        setIsLoading(true);
        try {
            if (session) await signOut();
            else await signIn();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-2xl font-bold mb-6">Sidebar</h1>
                <nav className="space-y-2">
                    {lists.map((list, index) => {
                        const isActive = pathname === list.url;
                        return (
                            <Link
                                key={index}
                                href={list.url}
                                className={`flex items-center gap-3 p-2 rounded-sm text-base font-medium transition-colors ${
                                    isActive
                                        ? "bg-white text-black"
                                        : "bg-gray-700 text-white hover:bg-white hover:text-black"
                                }`}
                            >
                                <i className={`bx ${list.icon} text-xl`}></i>
                                {list.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button
                onClick={handleAuth}
                disabled={isLoading}
                className="flex items-center gap-3 p-2 bg-gray-700 text-white hover:bg-white hover:text-black transition-colors text-base font-medium w-full rounded-sm"
            >
                <i className={`bx ${session ? "bx-log-out" : "bx-log-in"} text-xl`}></i>
                {isLoading ? "Loading..." : session ? "Logout" : "Login"}
            </button>
        </div>
    );
};

export default Sidebar;
