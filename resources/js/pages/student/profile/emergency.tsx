import { Head, usePage } from "@inertiajs/react";
// layouts
import ProfileLayout from "@/layouts/profile";
// local components
import ProfileComponents from "./components/profile";

export default function Emergency() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Student Profile" />
            <ProfileLayout pageTitle={"My Profile"} pageDescription={"Profile and account security information."}>
                
            </ProfileLayout>
        </>
    );
}