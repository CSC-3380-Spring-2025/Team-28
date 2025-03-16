"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavMain = NavMain;
const lucide_react_1 = require("lucide-react");
const collapsible_1 = require("@/components/ui/collapsible");
const sidebar_1 = require("@/components/ui/sidebar");
function NavMain({ items, }) {
    return (<sidebar_1.SidebarGroup>
      <sidebar_1.SidebarMenu>
        {items.map((item) => {
            var _a;
            return (<collapsible_1.Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <sidebar_1.SidebarMenuItem>
              <collapsible_1.CollapsibleTrigger asChild>
                <sidebar_1.SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <lucide_react_1.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                </sidebar_1.SidebarMenuButton>
              </collapsible_1.CollapsibleTrigger>
              <collapsible_1.CollapsibleContent>
                <sidebar_1.SidebarMenuSub>
                  {(_a = item.items) === null || _a === void 0 ? void 0 : _a.map((subItem) => (<sidebar_1.SidebarMenuSubItem key={subItem.title}>
                      <sidebar_1.SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </sidebar_1.SidebarMenuSubButton>
                    </sidebar_1.SidebarMenuSubItem>))}
                </sidebar_1.SidebarMenuSub>
              </collapsible_1.CollapsibleContent>
            </sidebar_1.SidebarMenuItem>
          </collapsible_1.Collapsible>);
        })}
      </sidebar_1.SidebarMenu>
    </sidebar_1.SidebarGroup>);
}
