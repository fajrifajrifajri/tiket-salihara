import { AppSidebar } from "@/components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function Dasbor({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <div className="w-full p-6">
                <SidebarTrigger />
                <div className="px-8 py-2">{children}</div>
            </div>
        </SidebarProvider>
    );
}
