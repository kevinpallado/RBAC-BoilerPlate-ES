import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface BillingProps {
    billing?: any;
}

export default function BillingInfo({ billing }: BillingProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>as of {billing.AYTerm}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div>
                        <div className="text-2xl font-bold">Php {billing.Assessment}</div>
                        <p className="text-xs text-muted-foreground">
                            Total Assessment
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">Php {billing.ActualPayment}</div>
                        <p className="text-xs text-muted-foreground">
                            Total Payment
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">Php {billing.Discount}</div>
                        <p className="text-xs text-muted-foreground">
                            Total Discount
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">Php {billing.CreditMemo}</div>
                        <p className="text-xs text-muted-foreground">
                            Credit Memo
                        </p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">Php {billing.Balance}</div>
                        <p className="text-xs text-muted-foreground">
                            Outstanding Balance
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}