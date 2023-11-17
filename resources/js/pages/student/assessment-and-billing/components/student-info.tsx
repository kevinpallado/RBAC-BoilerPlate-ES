import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface StudentProps {
    studentInfo?: any;
}

export default function StudentInfo({ studentInfo }: StudentProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Academic Details</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div>
                        <div className="text-2xl font-bold">{studentInfo?.students.FirstName} {studentInfo?.students.LastName}</div>
                        <p className="text-xs text-muted-foreground">
                            Full Name
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{studentInfo?.StudentNo}</div>
                        <p className="text-xs text-muted-foreground">
                            ID Number
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{studentInfo?.RegID}</div>
                        <p className="text-xs text-muted-foreground">
                            Registration Ref#
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{studentInfo?.year_level.YearLevelName}</div>
                        <p className="text-xs text-muted-foreground">
                            Year Level
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{studentInfo?.students?.program?.ProgName}</div>
                        <p className="text-xs text-muted-foreground">
                            Program
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}