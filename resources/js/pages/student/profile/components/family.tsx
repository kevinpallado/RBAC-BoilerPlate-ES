import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { router, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
// global components
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
    Father_FirstName: z.string().min(3, { message: "First Name is required" }),
    Father_MiddleName: z.string().optional(),
    Father_LastName: z.string().min(2, { message: "Last Name is required" }),
    Father_Address: z.string().optional(),
    Father_TelNo: z.string().optional(),
    Father_Email: z.string().optional(),
    Father_Mobile: z.string().min(5, { message: "Mobile # is required" }),
    Father_Occupation: z.string().optional(),
    Father_Company: z.string().optional(),
    Father_CompanyAddress: z.string().optional(),
    Father_CompanyPhone: z.string().optional(),
    Father_Monthly_Income: z.string().optional(),
    Mother_FirstName: z.string().min(3, { message: "First Name is required" }),
    Mother_MiddleName: z.string().optional(),
    Mother_LastName: z.string().min(2, { message: "Last Name is required" }),
    Mother_Address: z.string().optional(),
    Mother_TelNo: z.string().optional(),
    Mother_Email: z.string().optional(),
    Mother_Mobile: z.string().min(5, { message: "Mobile # is required" }),
    Mother_Occupation: z.string().optional(),
    Mother_Company: z.string().optional(),
    Mother_CompanyAddress: z.string().optional(),
    Mother_CompanyPhone: z.string().optional(),
    Mother_Monthly_Income: z.string().optional(),
    Guardian_FirstName: z.string().min(2, { message: "First Name is required" }),
    Guardian_MiddleName: z.string().optional(),
    Guardian_LastName: z.string().min(2, { message: "Last Name is required" }),
    Guardian_Address: z.string().optional(),
    Guardian_ProvinceID: z.string().min(1, { message: 'Must select province' }),
    Guardian_CityID: z.string().min(1, { message: 'Must select city' }),
    Guardian_BarangayID: z.string().min(1, { message: 'Must select barangay' }),
    Guardian_ZipCode: z.string().optional(),
})

export default function FamilyComponents() {
    const { toast } = useToast()

    const { profile, province, cities, barangay, family } = usePage<any>().props;
    // constants
    const [guardianSelectedProvince, setGuardianSelectedProvince] = useState<any>(null);
    const [guardianCity, setGuardianCity] = useState(cities);
    const [guardianSelectedCity, setGuardianSelectedCity] = useState<any>(family?.Guardian_CityID ? family?.Guardian_CityID : null);
    const [guardianBrgy, setGuardianBrgy] = useState(barangay);
    const [guardianSelectedBrgy, setGuardianSelectedBrgy] = useState<any>(family?.Guardian_BarangayID ? family?.Guardian_BarangayID : null);
    const [reloadGuardianData, setReloadGuardianData] = useState<boolean>(false);
    const [selectedGuardian, setSelectedGuardian] = useState<string>("");
    const [disableGuardianInput, setDisableGuardianInput] = useState<boolean>(true);

    const [submitForm, setSubmitForm] = useState<boolean>(false);

    useEffect(() => {
        if (guardianSelectedProvince != null && guardianSelectedCity == null && guardianSelectedBrgy == null) {
            fetch(route('select.address', { type: 'city', province: guardianSelectedProvince, length: 10 })).then((resp) => resp.json()).then((res) => setGuardianCity(res.options))
        }

        if (guardianSelectedProvince != null && guardianSelectedCity != null && guardianSelectedBrgy == null) {
            fetch(route('select.address', { type: 'barangay', city: guardianSelectedCity, length: 10 })).then((resp) => resp.json()).then((res) => setGuardianBrgy(res.options))
        }
    }, [reloadGuardianData])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Father_FirstName: family?.Father_FirstName,
            Father_MiddleName: family?.Father_MiddleName,
            Father_LastName: family?.Father_LastName,
            Father_Address: family?.Father_Address,
            Father_TelNo: family?.Father_TelNo,
            Father_Email: family?.Father_Email,
            Father_Mobile: family?.Father_Mobile,
            Father_Occupation: family?.Father_Occupation,
            Father_Company: family?.Father_Company,
            Father_CompanyAddress: family?.Father_CompanyAddress,
            Father_CompanyPhone: family?.Father_CompanyPhone,
            Father_Monthly_Income: family?.Father_Monthly_Income ? family?.Father_Monthly_Income : "",
            Mother_FirstName: family?.Mother_FirstName,
            Mother_MiddleName: family?.Mother_MiddleName,
            Mother_LastName: family?.Mother_LastName,
            Mother_Address: family?.Mother_Address,
            Mother_TelNo: family?.Mother_TelNo,
            Mother_Email: family?.Mother_Email,
            Mother_Mobile: family?.Mother_Mobile,
            Mother_Occupation: family?.Mother_Occupation,
            Mother_Company: family?.Mother_Company,
            Mother_CompanyAddress: family?.Mother_CompanyAddress,
            Mother_CompanyPhone: family?.Mother_CompanyPhone,
            Mother_Monthly_Income: family?.Mother_Monthly_Income ? family?.Mother_Monthly_Income : "",
            Guardian_FirstName: family?.Guardian_FirstName,
            Guardian_MiddleName: family?.Guardian_MiddleName,
            Guardian_LastName: family?.Guardian_LastName,
            Guardian_Address: family?.Guardian_Address,
            Guardian_ProvinceID: family?.Guardian_ProvinceID ? (family?.Guardian_ProvinceID).toString() : "",
            Guardian_CityID: family?.Guardian_CityID ? (family?.Guardian_CityID).toString() : "",
            Guardian_BarangayID: family?.Guardian_BarangayID ? (family?.Guardian_BarangayID).toString() : "",
            Guardian_ZipCode: family?.Guardian_ZipCode,
        }
    });

    function currentGuardian(e: string) {
        setSelectedGuardian(e);
        form.setValue('Guardian_FirstName', "");
        form.setValue('Guardian_MiddleName', "");
        form.setValue('Guardian_LastName', "");
        form.setValue('Guardian_Address', "");
        switch (e) {
            case 'mother':
                setDisableGuardianInput(true);
                form.setValue('Guardian_FirstName', form.getValues('Mother_FirstName') ?? "")
                form.setValue('Guardian_MiddleName', form.getValues('Mother_MiddleName') ?? "")
                form.setValue('Guardian_LastName', form.getValues('Mother_LastName') ?? "")
                form.setValue('Guardian_Address', form.getValues('Mother_Address') ?? "")
                break;
            case 'father':
                setDisableGuardianInput(true);
                form.setValue('Guardian_FirstName', form.getValues('Father_FirstName') ?? "")
                form.setValue('Guardian_MiddleName', form.getValues('Father_MiddleName') ?? "")
                form.setValue('Guardian_LastName', form.getValues('Father_LastName') ?? "")
                form.setValue('Guardian_Address', form.getValues('Father_Address') ?? "")
                break;
            default:
                setDisableGuardianInput(false);
                break;
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitForm(true);
        router.post(route('students.submit.family', { student: profile.StudentNo }), values, {
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Father Information</h4>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="Father_FirstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_LastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_MiddleName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-sm text-muted-foreground underline underline-offset-8">Contact Information</p>
                    <FormField
                        control={form.control}
                        name="Father_Address"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_Mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone No.</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_TelNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tel No.</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_Email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <p className="text-sm text-muted-foreground underline underline-offset-8">Occupation Information</p>
                <div className="grid grid-cols-6 gap-4">
                    <FormField
                        control={form.control}
                        name="Father_Occupation"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_Monthly_Income"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Monthly Income</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_Company"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_CompanyAddress"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Company Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Father_CompanyPhone"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Company Contact No.</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Mother Information</h4>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="Mother_FirstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_LastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_MiddleName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-sm text-muted-foreground underline underline-offset-8">Contact Information</p>
                    <FormField
                        control={form.control}
                        name="Mother_Address"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_Mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone No.</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_TelNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tel No.</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_Email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <p className="text-sm text-muted-foreground underline underline-offset-8">Occupation Information</p>
                <div className="grid grid-cols-6 gap-4">
                    <FormField
                        control={form.control}
                        name="Mother_Occupation"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_Monthly_Income"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Monthly Income</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_Company"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_CompanyAddress"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Company Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Mother_CompanyPhone"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Company Contact No.</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Guardian Information</h4>
                <RadioGroup onValueChange={currentGuardian} className="flex justify-start" value={selectedGuardian}>
                    <div className="text-lg font-semibold">Who is your current guardian?</div>
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
                </RadioGroup>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="Guardian_FirstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={disableGuardianInput} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Guardian_LastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={disableGuardianInput} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Guardian_MiddleName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={disableGuardianInput} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Guardian_Address"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={disableGuardianInput} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-10 gap-4">
                    <FormField
                        control={form.control}
                        name="Guardian_ProvinceID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        form.setValue('Guardian_CityID', "")
                                        setGuardianSelectedCity(null)
                                        setGuardianCity([])
                                        setGuardianSelectedBrgy(null)
                                        setGuardianBrgy([])
                                        setGuardianSelectedProvince(e)
                                        setReloadGuardianData(!reloadGuardianData)
                                        field.onChange(e)
                                    }} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Provinces</SelectLabel>
                                                {province.map((prov: any, index: number) => <SelectItem key={index} value={(prov.ProvinceID).toString()}>{prov.ProvinceName}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Guardian_CityID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        setGuardianSelectedBrgy(null)
                                        setGuardianBrgy([])
                                        setGuardianSelectedCity(e)
                                        setReloadGuardianData(!reloadGuardianData)
                                        field.onChange(e)
                                    }} value={field.value}>

                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Cities</SelectLabel>
                                                {guardianCity.length > 0 && guardianCity.map((resCity: any, index: number) => <SelectItem key={index} value={(resCity.CityID).toString()}>{resCity.CityName}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Guardian_BarangayID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Barangay</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        setGuardianSelectedBrgy(e)
                                        field.onChange(e)
                                    }} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Barangay`s</SelectLabel>
                                                {guardianBrgy.length > 0 && guardianBrgy.map((brgy: any, index: number) => <SelectItem key={index} value={(brgy.BrgyID).toString()}>{brgy.BrgyName}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Guardian_ZipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
    )
}