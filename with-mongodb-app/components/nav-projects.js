"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavProjects = NavProjects;
const lucide_react_1 = require("lucide-react");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const sidebar_1 = require("@/components/ui/sidebar");
function NavProjects({ projects, }) {
    const { isMobile } = (0, sidebar_1.useSidebar)();
    return (<sidebar_1.SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <sidebar_1.SidebarGroupLabel>Projects</sidebar_1.SidebarGroupLabel>
      <sidebar_1.SidebarMenu>
        {projects.map((item) => (<sidebar_1.SidebarMenuItem key={item.name}>
            <sidebar_1.SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </sidebar_1.SidebarMenuButton>
            <dropdown_menu_1.DropdownMenu>
              <dropdown_menu_1.DropdownMenuTrigger asChild>
                <sidebar_1.SidebarMenuAction showOnHover>
                  <lucide_react_1.MoreHorizontal />
                  <span className="sr-only">More</span>
                </sidebar_1.SidebarMenuAction>
              </dropdown_menu_1.DropdownMenuTrigger>
              <dropdown_menu_1.DropdownMenuContent className="w-48 rounded-lg" side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
                <dropdown_menu_1.DropdownMenuItem>
                  <lucide_react_1.Folder className="text-muted-foreground"/>
                  <span>View Project</span>
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuItem>
                  <lucide_react_1.Forward className="text-muted-foreground"/>
                  <span>Share Project</span>
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuSeparator />
                <dropdown_menu_1.DropdownMenuItem>
                  <lucide_react_1.Trash2 className="text-muted-foreground"/>
                  <span>Delete Project</span>
                </dropdown_menu_1.DropdownMenuItem>
              </dropdown_menu_1.DropdownMenuContent>
            </dropdown_menu_1.DropdownMenu>
          </sidebar_1.SidebarMenuItem>))}
        <sidebar_1.SidebarMenuItem>
          <sidebar_1.SidebarMenuButton className="text-sidebar-foreground/70">
            <lucide_react_1.MoreHorizontal className="text-sidebar-foreground/70"/>
            <span>More</span>
          </sidebar_1.SidebarMenuButton>
        </sidebar_1.SidebarMenuItem>
      </sidebar_1.SidebarMenu>
    </sidebar_1.SidebarGroup>);
}
