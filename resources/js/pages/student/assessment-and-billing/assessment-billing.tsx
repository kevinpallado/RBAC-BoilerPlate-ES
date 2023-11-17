import { Head, router, usePage } from "@inertiajs/react";
// layouts
import DashboardLayout from "@/layouts/main";
// global components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// local components
import BillingInfo from "./components/billing-info";
import StudentInfo from "./components/student-info";
import PaymentScheduleInfo from "./components/payment-schedule";
import { useState } from "react";

export default function AssessmentBilling() {

    const { billing, studentInfo, registeredTerm } = usePage<any>().props;
    const [selectedAYTerm, setSelectedAYTerm] = useState<string>(studentInfo?.TermID);

    function reloadData(e: any) {
        setSelectedAYTerm(e)
        router.get(route('students.assessment-billing.index'), e === "" ? {} : { ayterm: e }, { preserveState: true, replace: true })
    }

    return (
        <>
            <Head title="Student" />
            <DashboardLayout pageTitle={"Assessment and Billing"} pageDescription={"Assess your university payables by academic year term registered."}>
                <div className="flex justify-end">
                    <Select onValueChange={reloadData} value={selectedAYTerm}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Academic Year Term" />
                        </SelectTrigger>
                        <SelectContent>
                            {registeredTerm.length > 0 && registeredTerm.map((ayterm: any) =>
                                <SelectItem key={ayterm.TermID} value={ayterm.TermID}>{ayterm.ayterm.AcademicYear} {ayterm.ayterm.SchoolTerm}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <BillingInfo billing={billing} />
                    <StudentInfo studentInfo={studentInfo} />
                </div>
                <PaymentScheduleInfo dateFees={studentInfo?.table_of_fees_due_dates} installmentBalance={studentInfo?.installment_balance} />
            </DashboardLayout>
        </>
    );

}