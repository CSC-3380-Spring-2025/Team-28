"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavUser = NavUser;
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("@/components/ui/avatar");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const sidebar_1 = require("@/components/ui/sidebar");
function NavUser({ user, }) {
    const { isMobile } = (0, sidebar_1.useSidebar)();
    return (<sidebar_1.SidebarMenu>
      <sidebar_1.SidebarMenuItem>
        <dropdown_menu_1.DropdownMenu>
          <dropdown_menu_1.DropdownMenuTrigger asChild>
            <sidebar_1.SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <avatar_1.Avatar className="h-8 w-8 rounded-lg">
                <avatar_1.AvatarImage src={user.avatar} alt={user.name}/>
                <avatar_1.AvatarFallback className="rounded-lg">CN</avatar_1.AvatarFallback>
              </avatar_1.Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <lucide_react_1.ChevronsUpDown className="ml-auto size-4"/>
            </sidebar_1.SidebarMenuButton>
          </dropdown_menu_1.DropdownMenuTrigger>
          <dropdown_menu_1.DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <dropdown_menu_1.DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <avatar_1.Avatar className="h-8 w-8 rounded-lg">
                  <avatar_1.AvatarImage src={user.avatar} alt={user.name}/>
                  <avatar_1.AvatarFallback className="rounded-lg">CN</avatar_1.AvatarFallback>
                </avatar_1.Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </dropdown_menu_1.DropdownMenuLabel>
            <dropdown_menu_1.DropdownMenuSeparator />
            <dropdown_menu_1.DropdownMenuGroup>
              <dropdown_menu_1.DropdownMenuItem>
                <lucide_react_1.Sparkles />
                Upgrade to Pro
              </dropdown_menu_1.DropdownMenuItem>
            </dropdown_menu_1.DropdownMenuGroup>
            <dropdown_menu_1.DropdownMenuSeparator />
            <dropdown_menu_1.DropdownMenuGroup>
              <dropdown_menu_1.DropdownMenuItem>
                <lucide_react_1.BadgeCheck />
                Account
              </dropdown_menu_1.DropdownMenuItem>
              <dropdown_menu_1.DropdownMenuItem>
                <lucide_react_1.CreditCard />
                Billing
              </dropdown_menu_1.DropdownMenuItem>
              <dropdown_menu_1.DropdownMenuItem>
                <lucide_react_1.Bell />
                Notifications
              </dropdown_menu_1.DropdownMenuItem>
            </dropdown_menu_1.DropdownMenuGroup>
            <dropdown_menu_1.DropdownMenuSeparator />
            <dropdown_menu_1.DropdownMenuItem>
              <lucide_react_1.LogOut />
              Log out
            </dropdown_menu_1.DropdownMenuItem>
          </dropdown_menu_1.DropdownMenuContent>
        </dropdown_menu_1.DropdownMenu>
      </sidebar_1.SidebarMenuItem>
    </sidebar_1.SidebarMenu>);
}
