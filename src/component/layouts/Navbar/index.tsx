import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-lg font-bold text-blue-600">MyApp</div>
      <div>
        <button
          onClick={() => (session ? signOut() : signIn())}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {session ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;