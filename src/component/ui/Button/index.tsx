type PropsTypes = {
    type: "button" | "submit" | "reset" | undefined;
    OnClick?: () => void;
    children: React.ReactNode;
}

const Button = (props: PropsTypes) => {
    const { type, OnClick, children } = props;
    return (
        <button
            type={type}
            onClick={OnClick}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md transition">{children}
        </button>
    );
};

export default Button;