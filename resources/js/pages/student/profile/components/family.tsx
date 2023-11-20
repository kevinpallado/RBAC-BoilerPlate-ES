import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { usePage } from "@inertiajs/react"
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
    Father_FirstName: z.string(),
    Father_MiddleName: z.string(),
    Father_LastName: z.string(),
    Father_Address: z.string(),
    Father_TelNo: z.string(),
    Father_Email: z.string(),
    Father_Mobile: z.string(),
    Father_Occupation: z.string(),
    Father_Company: z.string(),
    Father_CompanyAddress: z.string(),
    Father_CompanyPhone: z.string(),
    Father_Monthly_Income: z.string(),
    Mother_FirstName: z.string(),
    Mother_MiddleName: z.string(),
    Mother_LastName: z.string(),
    Mother_Address: z.string(),
    Mother_TelNo: z.string(),
    Mother_Email: z.string(),
    Mother_Mobile: z.string(),
    Mother_Occupation: z.string(),
    Mother_Company: z.string(),
    Mother_CompanyAddress: z.string(),
    Mother_CompanyPhone: z.string(),
    Mother_Monthly_Income: z.string(),
    Guardian_FirstName: z.string(),
    Guardian_MiddleName: z.string(),
    Guardian_LastName: z.string(),
    Guardian_Address: z.string(),
    Guardian_ProvinceID: z.string(),
    Guardian_CityID: z.string(),
    Guardian_BarangayID: z.string(),
    Guardian_ZipCode: z.string(),
})

export default function FamilyComponents() {
    const { toast } = useToast()

    const { province, family } = usePage<any>().props;
    // constants
    const [guardianSelectedProvince, setGuardianSelectedProvince] = useState<any>(null);
    const [guardianCity, setGuardianCity] = useState([]);
    const [guardianSelectedCity, setGuardianSelectedCity] = useState<any>(family.Guardian_CityID ? family.Guardian_CityID : null);
    const [guardianBrgy, setGuardianBrgy] = useState([]);
    const [guardianSelectedBrgy, setGuardianSelectedBrgy] = useState<any>(family.Guardian_BarangayID ? family.Guardian_BarangayID : null);
    const [reloadGuardianData, setReloadGuardianData] = useState<boolean>(false);
    const [selectedGuardian, setSelectedGuardian] = useState<string>("");

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
            Father_FirstName: "",
            Father_MiddleName: "",
            Father_LastName: "",
            Father_Address: ""
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                <RadioGroup onValueChange={(e:any) => setSelectedGuardian(e)} className="flex justify-start" value={selectedGuardian}>
                    <div className="text-lg font-semibold">Who is your currently guardian?</div>
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
                                    <Input {...field} disabled />
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
                                    <Input {...field} disabled/>
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
                                    <Input {...field} disabled/>
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
                                    <Input {...field} disabled/>
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
            </form>
        </Form>
    )
}