import { readableDate } from "@/utils"

interface PaymentSchedProps {
    dateFees?: any;
    installmentBalance?: any
}

export default function PaymentScheduleInfo({ dateFees, installmentBalance }: PaymentSchedProps) {
    return (
        <div className="space-y-8">
            {dateFees?.Date1 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{readableDate(dateFees?.Date1)}</p>
                    <p className="text-sm text-muted-foreground">
                        1st Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['1stPayment']}</div>
            </div>}
            {dateFees?.Date2 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date2}</p>
                    <p className="text-sm text-muted-foreground">
                        2nd Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['2ndPayment']}</div>
            </div>}
            {dateFees?.Date3 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date3}</p>
                    <p className="text-sm text-muted-foreground">
                        3rd Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['3rdPayment']}</div>
            </div>}
            {dateFees?.Date4 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date4}</p>
                    <p className="text-sm text-muted-foreground">
                        4th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['4thPayment']}</div>
            </div>}
            {dateFees?.Date5 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date5}</p>
                    <p className="text-sm text-muted-foreground">
                        5th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['5thPayment']}</div>
            </div>}
            {dateFees?.Date6 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date6}</p>
                    <p className="text-sm text-muted-foreground">
                        6th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['6thPayment']}</div>
            </div>}
            {dateFees?.Date7 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date7}</p>
                    <p className="text-sm text-muted-foreground">
                        7th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['7thPayment']}</div>
            </div>}
            {dateFees?.Date8 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date8}</p>
                    <p className="text-sm text-muted-foreground">
                        8th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['8thPayment']}</div>
            </div>}
            {dateFees?.Date9 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date9}</p>
                    <p className="text-sm text-muted-foreground">
                        9th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['9thPayment']}</div>
            </div>}
            {dateFees?.Date10 && <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{dateFees?.Date10}</p>
                    <p className="text-sm text-muted-foreground">
                        10th Payment Schedule
                    </p>
                </div>
                <div className="ml-auto font-medium">Php {installmentBalance['10thPayment']}</div>
            </div>}
        </div>
    )
}