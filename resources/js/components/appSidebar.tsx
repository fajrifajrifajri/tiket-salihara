import {
    Tag,
    TicketPercent,
    TicketSlash,
    FileText,
    ChevronRight,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import Logo from "./ui/logo";
import {
    berbayarItems,
    laporanItems,
    rsvpItems,
    utamaItems,
} from "./appSidebarData";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "@inertiajs/react";

interface Item {
    title: string;
    url: string;
}

interface SidebarGroupProps {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    items: Item[];
}

const SidebarGroupStructure: React.FC<SidebarGroupProps> = ({
    label,
    icon: Icon,
    items,
}) => {
    const currentPath = window.location.pathname; // Get the current URL path

    return (
        <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-purple-1 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-purple-1 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-purple-1 h-8">
                        <Icon />
                        {label}
                        <ChevronRight className="lucide lucide-chevron-right ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <CollapsibleContent>
                        <SidebarMenuSub className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden">
                            {items.map((item) => {
                                const isActive = currentPath === item.url; // Check if current URL path matches item URL

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-mine-1 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-base group-data-[collapsible=icon]:hidden ${
                                                isActive
                                                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                                                    : ""
                                            }`} // Apply 'active' class when matched
                                            asChild
                                        >
                                            <Link href={item.url}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarGroupContent>
            </Collapsible>
        </SidebarGroup>
    );
};

export const AppSidebar = () => (
    <Sidebar>
        <SidebarContent>
            <SidebarHeader className="py-8">
                <Logo isScrolled={false} showDescription={false} />
            </SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel className="cursor-default text-base text-sidebar-foreground/70">
                    DASHBOARD
                </SidebarGroupLabel>
            </SidebarGroup>
            <SidebarGroupStructure
                label="Utama"
                items={utamaItems}
                icon={Tag}
            />
            <SidebarGroupStructure
                label="Berbayar"
                items={berbayarItems}
                icon={TicketPercent}
            />
            <SidebarGroupStructure
                label="RSVP"
                items={rsvpItems}
                icon={TicketSlash}
            />
            <SidebarGroupStructure
                label="Laporan"
                items={laporanItems}
                icon={FileText}
            />
        </SidebarContent>
    </Sidebar>
);
