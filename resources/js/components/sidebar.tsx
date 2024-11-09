import {
    LayoutGrid,
    ClipboardList,
    Receipt,
    Ticket,
    Image,
    Calendar,
    ListOrdered,
    UserCheck,
    FileText,
    ChevronDown,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
export function AdminSidebar() {
    <Sidebar className="border-r-0 bg-black text-white w-64">
        <SidebarHeader className="border-b border-white/10 p-4">
            <h2 className="text-lg font-bold">TIKET ADMIN</h2>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <LayoutGrid className="h-4 w-4" />
                        <span>Kategori</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <ClipboardList className="h-4 w-4" />
                        <span>Survei</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Receipt className="h-4 w-4" />
                        <span>Pajak</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Ticket className="h-4 w-4" />
                        <span>Kupon</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Image className="h-4 w-4" />
                        <span>Slider</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>

            <SidebarGroup>
                <Collapsible defaultOpen>
                    <SidebarGroupLabel asChild className="text-purple-400">
                        <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
                            BERBAYAR
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Calendar className="h-4 w-4" />
                                        <span>Acara Berbayar</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <ListOrdered className="h-4 w-4" />
                                        <span>List Order Berbayar</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <UserCheck className="h-4 w-4" />
                                        <span>Check In Berbayar</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarGroup>

            <SidebarGroup>
                <Collapsible>
                    <SidebarGroupLabel asChild className="text-purple-400">
                        <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
                            RSVP
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Calendar className="h-4 w-4" />
                                        <span>Acara RSVP</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <ListOrdered className="h-4 w-4" />
                                        <span>List Order RSVP</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <UserCheck className="h-4 w-4" />
                                        <span>Check In RSVP</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarGroup>

            <SidebarGroup>
                <Collapsible>
                    <SidebarGroupLabel asChild className="text-purple-400">
                        <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
                            LAPORAN
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FileText className="h-4 w-4" />
                                        <span>Laporan Acara Berbayar</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FileText className="h-4 w-4" />
                                        <span>Laporan Acara RSVP</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>;
}
