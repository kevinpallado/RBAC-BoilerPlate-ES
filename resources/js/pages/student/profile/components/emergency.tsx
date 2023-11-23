import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { router, usePage } from "@inertiajs/react"
import { useState } from "react"
// global components
import { useToast } from "@/components/ui/use-toast"
import { BellIcon, ReloadIcon } from "@radix-ui/react-icons"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
    EmergencyContact: z.string().min(4, { message: 'Please provide proper name' }),
    EmergencyAddress: z.string().min(6, { message: 'Please provide address' }),
    EmergencyMobileNo: z.string().min(6, { message: 'Please provide mobile number' }),
    EmergencyTelNo: z.string().optional()
})

export default function EmergencyComponents() {
    const { toast } = useToast()
    const { student, family } = usePage<any>().props;

    const [submitForm, setSubmitForm] = useState<boolean>(false);
    const [disabledInput, setDisabledInput] = useState<boolean>(true);
    const [emergencySelectedContact, setEmergencySelectedContact] = useState<any>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            EmergencyContact: family?.EmergencyContact ? family?.EmergencyContact : "",
            EmergencyAddress: family?.EmergencyAddress ? family?.EmergencyAddress : "",
            EmergencyMobileNo: family?.EmergencyMobileNo ? family?.EmergencyMobileNo : "",
            EmergencyTelNo: family?.EmergencyTelNo ? family?.EmergencyTelNo : "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitForm(true);
        router.post(route('students.submit.profile.emergency', { student: student.StudentNo }), values, {
            onSuccess: (success: any) => {
                setSubmitForm(false);
                toast({
                    title: "Notification",
                    description: success.props.form.message,
                })
            },
            onError: error => {
                toast({
                    variant: "destructive",
                    title: "Snap!",
                    description: error.message,
                })
                setSubmitForm(false);
            }
        });
    }

    function currentEmergencyInfo(e: string) {
        setEmergencySelectedContact(e)
        form.setValue('EmergencyContact', "");
        form.setValue('EmergencyAddress', "");
        form.setValue('EmergencyMobileNo', "");
        form.setValue('EmergencyTelNo', "");
        switch (e) {
            case 'father':
                setDisabledInput(true)
                form.setValue('EmergencyContact', family?.Father_Name);
                form.setValue('EmergencyAddress', family?.Father_Address);
                form.setValue('EmergencyMobileNo', family?.Father_Mobile);
                form.setValue('EmergencyTelNo', family?.Father_TelNo);
                break;
            case 'mother':
                setDisabledInput(true)
                form.setValue('EmergencyContact', family?.Mother_Name);
                form.setValue('EmergencyAddress', family?.Mother_address);
                form.setValue('EmergencyMobileNo', family?.Mother_Mobile);
                form.setValue('EmergencyTelNo', family?.Mother_TelNo);
                break;
            case 'guardian':
                setDisabledInput(true)
                form.setValue('EmergencyContact', family?.Guardian_Name);
                form.setValue('EmergencyAddress', family?.Guardian_Address);
                form.setValue('EmergencyMobileNo', "");
                form.setValue('EmergencyTelNo', "");
                break;
            default:
                setDisabledInput(false)
                break;
        }
    }

    return (
        <>
            {!student.FamilyID && <Alert>
                <BellIcon className="h-4 w-4" />
                <AlertTitle>Notice!</AlertTitle>
                <AlertDescription>
                    Please update family information before updating emergency contact!
                </AlertDescription>
            </Alert>}
            <RadioGroup disabled={!student.FamilyID} onValueChange={currentEmergencyInfo} className="flex justify-start" value={emergencySelectedContact}>
                <div className="text-lg font-semibold">Who is your current contact for emergency?</div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mother" id="r1" />
                    <Label htmlFor="r1">Mother</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="father" id="r2" />
                    <Label htmlFor="r2">Father</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="guardian" id="r3" />
                    <Label htmlFor="r3">Guardian</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="r3" />
                    <Label htmlFor="r3">Custom</Label>
                </div>
            </RadioGroup>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Emergency Information</h4>
                    <div className="grid grid-cols-4 gap-4">
                        <FormField
                            control={form.control}
                            name="EmergencyContact"
                            render={({ field }) => (
                                <FormItem className="col-span-4">
                                    <FormLabel>Emergency Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabledInput} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="EmergencyAddress"
                            render={({ field }) => (
                                <FormItem className="col-span-4">
                                    <FormLabel>Emergency Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabledInput}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="EmergencyMobileNo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Emergency Cel. #</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabledInput} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="EmergencyTelNo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Emergency Tel. #</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabledInput} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {!submitForm ? <Button type="submit">
                        Submit
                    </Button> :
                        <Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>}
                </form>
            </Form>
        </>
    )
}