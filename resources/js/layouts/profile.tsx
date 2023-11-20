import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { Toaster } from "@/components/ui/toaster"
import { dashboardConfig } from "@/config/dashboard";

interface ProfileLayoutProps {
    pageTitle: String;
    pageDescription: String;
    children?: React.ReactNode;
}

export default function ProfileLayout({ pageTitle, pageDescription, children }: ProfileLayoutProps) {
    const { auth } = usePage<any>().props;

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav />
                    <UserAccountNav
                        user={{
                            name: auth.user.name,
                            image: "https://avatars.githubusercontent.com/u/31546211?v=4",
                            email: auth.user.email,
                        }}
                    />
                </div>
            </header>
            <div className="container flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {pageTitle}
                    </h2>
                    <p className="text-muted-foreground">
                        {pageDescription}
                    </p>
                </div>
            </div>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <nav
                        className={cn(
                            "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                        )}
                    >
                        {dashboardConfig.profileNav.map((item: any, index: number) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    route().current(item.pathKey)
                                        ? "bg-muted hover:bg-muted"
                                        : "hover:bg-transparent hover:underline",
                                    "justify-start"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    <Toaster />
                    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}