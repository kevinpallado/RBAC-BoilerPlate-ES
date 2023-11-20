import { Head, router, usePage } from "@inertiajs/react";
import { readableDate } from "@/utils"
import { useEffect, useState } from "react";
// global components
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// layouts
import DashboardLayout from "@/layouts/main";

export default function SubjectsEnrolled() {

    const { subjectsEnrolled, registeredAYTerm, activeAyTerm } = usePage<any>().props;

    const [selectedTerm, setSelectedTerm] = useState<any>(null);

    function labelTags(tagCode: string) {
        switch (tagCode) {
            case 'AS':
                return "destructive";
            default:
                return "default";
        }
    }

    function getData(__ayterm: string) {
        router.get(route('students.subjects-enrolled.index'), __ayterm === "" ? {} : { ayterm: __ayterm }, { preserveState: true, replace: true, only: ['subjectsEnrolled'] })
    }

    useEffect(() => {
        if (selectedTerm != null) {
            const timeOutId = setTimeout(() => getData(selectedTerm), 500);
            return () => clearTimeout(timeOutId);
        }
    }, [selectedTerm]);

    return (
        <>
            <Head title="Student" />
            <DashboardLayout pageTitle={"Subjects Enrolled"} pageDescription={"List of subjects enrolled including add/drop/change."}>
                <div className="flex justify-end">
                    <Select onValueChange={(e: string) => setSelectedTerm(e)} value={selectedTerm ? selectedTerm : ""}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Academic Year Term" />
                        </SelectTrigger>
                        {registeredAYTerm.length > 0 && <SelectContent>
                            {registeredAYTerm.map((ayterm: any, index: number) =>
                                <SelectItem key={index} value={ayterm.TermID}>{ayterm.ayterm.AcademicYear} - {ayterm.ayterm.SchoolTerm}</SelectItem>)}
                        </SelectContent>}
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {subjectsEnrolled.map((subjects: any, index: number) => <Card key={index}>
                        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                            <div className="space-y-1">
                                <CardTitle>{subjects.subject_class_schedule.subjects.SubjectCode} - {subjects.subject_class_schedule.subjects.SubjectTitle}</CardTitle>
                                <CardDescription>
                                    <Badge variant={labelTags(subjects.register_load_tags.TagCode)}>{subjects.register_load_tags.TagDescription}</Badge>
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    {/* <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" /> */}
                                    Instructor: {subjects.subject_class_schedule.faculty ? `${subjects.subject_class_schedule.faculty.FirstName} ${subjects.subject_class_schedule.faculty.LastName}` : 'N/A'}
                                </div>
                            </div>
                            <div className=" text-sm ">
                                Registered Date : {readableDate(subjects.registration.RegDate)}
                            </div>
                        </CardContent>
                    </Card>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
}