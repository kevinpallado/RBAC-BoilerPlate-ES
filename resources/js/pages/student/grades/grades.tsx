import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
// global components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// layouts
import DashboardLayout from "@/layouts/main";

export default function Grades() {

    const { grades, enrolledTerm } = usePage<any>().props;

    const [selectedTerm, setSelectedTerm] = useState<any>(null);
    const [listOfGrades, setListOfGrades] = useState<any>((grades.filter((grade: any) => grade.TermID === enrolledTerm[0].TermID)));
    // functions
    function filterGrades() {
        let showOnlyGrades = grades.filter((grade:any) => grade.TermID === selectedTerm);
        setListOfGrades(showOnlyGrades);
    }

    useEffect(() => {
        if (selectedTerm != null) {
            filterGrades();
        }
    }, [selectedTerm]);

    return (
        <>
            <Head title="Student" />
            <DashboardLayout pageTitle={"Grades"} pageDescription={"Subjects with posted grades."}>
                <div className="flex justify-end">
                    <Select onValueChange={(e:string) => setSelectedTerm(e)} value={selectedTerm ? selectedTerm : ""}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Academic Year Term" />
                        </SelectTrigger>
                        {enrolledTerm.length > 0 && <SelectContent>
                            {enrolledTerm.map((ayterm: any) =>
                                <SelectItem key={ayterm.TermID} value={ayterm.TermID}>{ayterm.ayterm.AcademicYear} - {ayterm.ayterm.SchoolTerm}</SelectItem>)}
                        </SelectContent>}
                    </Select>
                </div>
                <Table>
                    <TableCaption>List of enrolled subjects with grade.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Subjects</TableCell>
                            <TableCell className="w-[100px] text-right">Units</TableCell>
                            <TableCell className="text-center">Section</TableCell>
                            <TableCell className="w-[100px] text-right ">Final Average</TableCell>
                            <TableCell className="text-center">Remarks</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listOfGrades.length > 0 ? listOfGrades.map((grades: any) =>
                            <TableRow
                                key={grades.GradeIDX}
                            >
                                <TableCell>{grades.subjects.SubjectTitle} <br /> {grades.subjects.SubjectCode}</TableCell>
                                <TableCell className="text-right">{grades.subjects.CreditUnits}</TableCell>
                                <TableCell className="text-center">{grades.class_schedules ? grades.class_schedules.class_section.SectionName : 'No Schedule'}</TableCell>
                                <TableCell className="text-right">{grades.Final_Average}</TableCell>
                                <TableCell className="text-center">{grades.Final_Remarks}</TableCell>
                            </TableRow>
                        ) : <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No Posted Grades
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </DashboardLayout>
        </>
    );
}