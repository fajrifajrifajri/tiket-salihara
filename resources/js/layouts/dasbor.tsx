import { AppSidebar } from "@/components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePage } from "@inertiajs/react";

export default function Dasbor({ children }: PropsWithChildren) {
    const { url } = usePage();

    const generateBreadcrumbs = () => {
        // Remove leading and trailing slashes and split path
        const paths = url.split("/").filter(Boolean);

        // Skip the first path if it's "dasbor"
        const displayPaths =
            paths[0] === "dasbor" ? paths : ["dasbor", ...paths];

        return displayPaths.map((path, index) => {
            const href = "/" + displayPaths.slice(0, index + 1).join("/");
            const name =
                path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

            return (
                <BreadcrumbItem key={href}>
                    {index === displayPaths.length - 1 ? (
                        <BreadcrumbPage className="underline">
                            {name}
                        </BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                    )}
                    {index < displayPaths.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
            );
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />

            <div className="w-full p-6">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <Breadcrumb>
                        <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="md:px-8 py-2">{children}</div>
                <Toaster />
            </div>
        </SidebarProvider>
    );
}
