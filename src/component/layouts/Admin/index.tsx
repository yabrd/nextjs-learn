import Sidebar from "@/component/fragments/Sidebar";

type PropsTypes = {
    children: React.ReactNode;
};

const listSidbarItems = [
    {
        name: 'Dashboard',
        url: '/admin',
        icon: 'bx-dashboard'
    },
    {
        name: 'Users',
        url: '/admin',
        icon: 'bx-user'
    },
    {
        name: 'Products',
        url: '/admin/products',
        icon: 'bx-box'
    }
]

const AdminLayout = ( props: PropsTypes ) => {
    const { children } = props;
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar lists={listSidbarItems} />
            <div className="flex-1 p-4">{children}</div>
        </div>
    );
};

export default AdminLayout;