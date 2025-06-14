type PropsTypes = {
    label: string;
    id: string;
    name?: string;
    type?: string;
    placeholder?: string;
};

const Input = (props: PropsTypes) => {
    const { label, id, name, type, placeholder } = props;
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label ? label : ""}</label>
            <input id={id} name={name ? name : id} type={type ? type : "text"} placeholder={placeholder || ""} className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
    );
};

export default Input;
