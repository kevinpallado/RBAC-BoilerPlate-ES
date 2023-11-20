import { Head, usePage } from "@inertiajs/react";
// layouts
import ProfileLayout from "@/layouts/profile";
// local components
import FamilyComponents from "./components/family"

export default function Family() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Student Family" />
            <ProfileLayout pageTitle={"My Profile"} pageDescription={"Profile and account security information."}>
                <FamilyComponents />
            </ProfileLayout>
        </>
    );
}