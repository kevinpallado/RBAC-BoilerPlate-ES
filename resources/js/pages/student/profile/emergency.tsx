import { Head, usePage } from "@inertiajs/react";
// layouts
import ProfileLayout from "@/layouts/profile";
// local components
import EmergencyComponents from "./components/emergency";

export default function Emergency() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Student Profile" />
            <ProfileLayout pageTitle={"My Profile"} pageDescription={"Profile and account security information."}>
                <EmergencyComponents />
            </ProfileLayout>
        </>
    );
}