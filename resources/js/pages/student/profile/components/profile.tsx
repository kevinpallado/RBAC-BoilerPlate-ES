import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import * as z from "zod"
// global components
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    FirstName: z.string({
        required_error: "First Name is required",
    }),
    LastName: z.string({
        required_error: "Last Name is required",
    }),
    Middlename: z.string(),
    ExtName: z.string(),
    PlaceOfBirth: z.string(),
    Gender: z.string().min(1, { message: 'Please select option' }),
    CivilStatusID: z.string().min(1, { message: 'Please select option' }),
    NationalityID: z.string().min(1, { message: 'Please select option' }),
    TelNo: z.string(),
    MobileNo: z.string().min(6, { message: 'Please provide mobile number' }),
    Email: z.string(),
    DateOfBirth: z.string({
        required_error: "A date of birth is required.",
    }),
    Res_ProvinceID: z.string().min(1, { message: 'Must select province' }),
    Res_TownCityID: z.string().min(1, { message: 'Must select city' }),
    Res_BarangayID: z.string().min(1, { message: 'Must select barangay' }),
    Res_ZipCode: z.string(),
    Perm_ProvinceID: z.string().min(1, { message: 'Must select province' }),
    Perm_TownCityID: z.string().min(1, { message: 'Must select city' }),
    Perm_BarangayID: z.string().min(1, { message: 'Must select barangay' }),
    Perm_ZipCode: z.string(),
})

export default function ProfileComponents() {
    const { toast } = useToast()
    const { profile, civilStatus, nationality, province, resBarangay, resCities, permBarangay, permCities } = usePage<any>().props;
    // constants
    const [residentialSelectedProvince, setResidentialSelectedProvince] = useState<any>(null);
    const [residentialCity, setResidentialCity] = useState(resCities);
    const [residentialSelectedCity, setResidentialSelectedCity] = useState<any>(profile.Res_TownCityID ? profile.Res_TownCityID : null);
    const [residentialBrgy, setResidentialBrgy] = useState(resBarangay);
    const [residentialSelectedBrgy, setResidentialSelectedBrgy] = useState<any>(profile.Res_BarangayID ? profile.Res_BarangayID : null);
    const [reloadResidentialData, setReloadResidentialData] = useState<boolean>(false);

    const [permanentSelectedProvince, setPermanentSelectedProvince] = useState<any>(null);
    const [permanentSelectedCity, setPermanentSelectedCity] = useState<any>(profile.Perm_TownCityID ? profile.Perm_TownCityID : null);
    const [permanentCity, setPermanentCity] = useState(permCities);
    const [permanentSelectedBrgy, setPermanentSelectedBrgy] = useState<any>(profile.Perm_BarangayID ? profile.Perm_BarangayID : null);
    const [permanentBrgy, setPermanentBrgy] = useState(permBarangay);

    const [submitForm, setSubmitForm] = useState<boolean>(false);

    useEffect(() => {
        if (residentialSelectedProvince != null && residentialSelectedCity == null && residentialSelectedBrgy == null) {
            fetch(route('select.address', { type: 'city', province: residentialSelectedProvince, length: 10 })).then((resp) => resp.json()).then((res) => setResidentialCity(res.options))
        }
        if (residentialSelectedProvince != null && residentialSelectedCity != null && residentialSelectedBrgy == null) {
            fetch(route('select.address', { type: 'barangay', city: residentialSelectedCity, length: 10 })).then((resp) => resp.json()).then((res) => setResidentialBrgy(res.options))
        }

        if (permanentSelectedProvince != null && permanentSelectedCity == null && permanentSelectedBrgy == null) {
            fetch(route('select.address', { type: 'city', province: permanentSelectedProvince, length: 10 })).then((resp) => resp.json()).then((res) => setPermanentCity(res.options))
        }
        if (permanentSelectedProvince != null && permanentSelectedCity != null && permanentSelectedBrgy == null) {
            fetch(route('select.address', { type: 'barangay', city: permanentSelectedCity, length: 10 })).then((resp) => resp.json()).then((res) => setPermanentBrgy(res.options))
        }
    }, [reloadResidentialData])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            FirstName: profile.FirstName,
            LastName: profile.LastName,
            Middlename: profile.Middlename,
            ExtName: profile.ExtName ? profile.ExtName : "",
            DateOfBirth: profile.DateOfBirth ? new Date(profile.DateOfBirth).toISOString().slice(0, 10) : "",
            PlaceOfBirth: profile.PlaceOfBirth ? profile.PlaceOfBirth : "",
            Gender: profile.Gender,
            CivilStatusID: profile.CivilStatusID ? (profile.CivilStatusID).toString() : "",
            NationalityID: profile.NationalityID ? (profile.NationalityID).toString() : "",
            TelNo: profile.TelNo ? profile.TelNo : "",
            MobileNo: profile.MobileNo,
            Email: profile.Email ? profile.Email : "",
            Res_ProvinceID: profile.Res_ProvinceID ? (profile.Res_ProvinceID).toString() : "",
            Res_TownCityID: profile.Res_TownCityID ? (profile.Res_TownCityID).toString() : "",
            Res_BarangayID: profile.Res_BarangayID ? (profile.Res_BarangayID).toString() : "",
            Res_ZipCode: profile.Res_ZipCode ? profile.Res_ZipCode : "",
            Perm_ProvinceID: profile.Perm_ProvinceID ? (profile.Perm_ProvinceID).toString() : "",
            Perm_TownCityID: profile.Perm_TownCityID ? (profile.Perm_TownCityID).toString() : "",
            Perm_BarangayID: profile.Perm_BarangayID ? (profile.Perm_BarangayID).toString() : "",
            Perm_ZipCode: profile.Perm_ZipCode ? profile.Perm_ZipCode : ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setSubmitForm(true);
        router.post(route('students.submit.profile', { student: profile.StudentNo }), values, {
            onSuccess: (success:any) => {
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
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Basic Information</h4>
                <div className="grid grid-cols-6 gap-4">
                    <FormField
                        control={form.control}
                        name="FirstName"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
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
                        name="LastName"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
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
                        name="Middlename"
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
                    <FormField
                        control={form.control}
                        name="ExtName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Extension Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g Jr./Sr./I and etc." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="DateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="PlaceOfBirth"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Place of Birth</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="M">Male</SelectItem>
                                                <SelectItem value="F">Female</SelectItem>
                                                <SelectItem value="PNTR">Prefer not to Respond</SelectItem>
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
                        name="CivilStatusID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Civil Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Civil Status</SelectLabel>
                                                {civilStatus.map((civil: any, index: number) => <SelectItem key={index} value={(civil.StatusID).toString()}>{civil.CivilDesc}</SelectItem>)}
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
                        name="NationalityID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nationality</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select nationality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Nationality</SelectLabel>
                                                {nationality.map((nation: any, index: number) => <SelectItem key={index} value={(nation.NationalityID).toString()}>{nation.Nationality}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Contact Information</h4>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="TelNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telephone #</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="MobileNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile #</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Email"
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
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Residential Address</h4>
                <span className="text-sm text-muted-foreground">Select list of province to show list of cities and consecutively list of barangay.</span>
                <div className="grid grid-cols-10 gap-4">
                    <FormField
                        control={form.control}
                        name="Res_ProvinceID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        form.setValue('Res_TownCityID', "")
                                        form.setValue('Res_BarangayID', "")
                                        setResidentialSelectedCity(null)
                                        setResidentialCity([])
                                        setResidentialSelectedBrgy(null)
                                        setResidentialBrgy([])
                                        setResidentialSelectedProvince(e)
                                        setReloadResidentialData(!reloadResidentialData)
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
                        name="Res_TownCityID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        setResidentialSelectedBrgy(null)
                                        setResidentialBrgy([])
                                        setResidentialSelectedCity(e)
                                        setReloadResidentialData(!reloadResidentialData)
                                        field.onChange(e)
                                    }} value={field.value}>

                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Cities</SelectLabel>
                                                {residentialCity.length > 0 && residentialCity.map((resCity: any, index: number) => <SelectItem key={index} value={(resCity.CityID).toString()}>{resCity.CityName}</SelectItem>)}
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
                        name="Res_BarangayID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Barangay</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        setResidentialSelectedBrgy(e)
                                        field.onChange(e)
                                    }} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Barangay`s</SelectLabel>
                                                {residentialBrgy.length > 0 && residentialBrgy.map((brgy: any, index: number) => <SelectItem key={index} value={(brgy.BrgyID).toString()}>{brgy.BrgyName}</SelectItem>)}
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
                        name="Res_ZipCode"
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
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Permanent Address</h4>
                <span className="text-sm text-muted-foreground">Select list of province to show list of cities and consecutively list of barangay.</span>
                <div className="grid grid-cols-10 gap-4">
                    <FormField
                        control={form.control}
                        name="Perm_ProvinceID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Province</FormLabel>
                                <Select onValueChange={(e: any) => {
                                    form.setValue('Perm_TownCityID', "")
                                    form.setValue('Perm_BarangayID', "")
                                    setPermanentSelectedCity(null)
                                    setPermanentCity([])
                                    setPermanentSelectedBrgy(null)
                                    setPermanentBrgy([])
                                    setPermanentSelectedProvince(e)
                                    setReloadResidentialData(!reloadResidentialData)
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Perm_TownCityID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        setPermanentSelectedBrgy(null)
                                        setPermanentBrgy([])
                                        setPermanentSelectedCity(e)
                                        setReloadResidentialData(!reloadResidentialData)
                                        field.onChange(e)
                                    }} value={field.value}>

                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Cities</SelectLabel>
                                                {permanentCity.length > 0 && permanentCity.map((resCity: any, index: number) => <SelectItem key={index} value={(resCity.CityID).toString()}>{resCity.CityName}</SelectItem>)}
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
                        name="Perm_BarangayID"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Barangay</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(e: any) => {
                                        setPermanentSelectedBrgy(e)
                                        field.onChange(e)
                                    }} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Barangay`s</SelectLabel>
                                                {permanentBrgy.length > 0 && permanentBrgy.map((brgy: any, index: number) => <SelectItem key={index} value={(brgy.BrgyID).toString()}>{brgy.BrgyName}</SelectItem>)}
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
                        name="Perm_ZipCode"
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