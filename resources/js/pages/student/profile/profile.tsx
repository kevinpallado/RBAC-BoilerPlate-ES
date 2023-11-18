import { Head, usePage } from "@inertiajs/react";
// layouts
import DashboardLayout from "@/layouts/main";

export default function Profile() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Student Profile" />
            <DashboardLayout pageTitle={"My Profile"} pageDescription={"Student basic information."}>

            </DashboardLayout>
        </>
    );
}