import { Head, usePage } from "@inertiajs/react";
// global components
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
// layouts
import DashboardLayout from "@/layouts/main";

export default function Evaluation() {

    const { studentCurriculum, studentGrades } = usePage<any>().props;

    function isGradeExists(subjectId: string) {
        return studentGrades.find((grades: any) => grades.SubjectID === subjectId) ? <p className="leading-7 [&:not(:first-child)]:mt-6">View Grades</p> : ''
    }

    return (
        <>
            <Head title="Student" />
            <DashboardLayout pageTitle={"Curriculum Evaluation"} pageDescription={"Student current curriculum evaluation enrolled and graded subjects."}>
                <Table>
                    <TableCaption>List of subjects base on curriculum.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Year Term</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="w-[100px] text-right">Credit</TableHead>
                            <TableHead className="w-[100px] text-right">Grades</TableHead>
                            <TableHead className="w-[150px] text-right">Pre-Req</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentCurriculum.curriculum.evaluation_details.map((row: any) => (
                            <TableRow key={row.IndexID}>
                                <TableCell>{row.yearterm.YearTermDesc}</TableCell>
                                <TableCell>{row.subject.SubjectTitle}</TableCell>
                                <TableCell className="font-medium text-right">{row.subject.CreditUnits}</TableCell>
                                <TableCell className="font-medium text-right">{isGradeExists(row.SubjectID)}</TableCell>
                                <TableCell className="text-right">{row.pre_requisite.length > 0 ? (row.pre_requisite.map((subjects: any, index: number) => <Badge key={index} className="mt-1">
                                    {subjects.subject.SubjectCode}
                                </Badge>)) : ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DashboardLayout>
        </>
    )
}