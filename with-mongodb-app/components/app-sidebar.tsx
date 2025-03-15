"use client"

import * as React from "react"
import {
  House,
  Settings,
  Sparkle,
  Sparkles,
  Star,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Test User",
    email: "user@emailprovider.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Hobby 1",
      url: "#",
      icon: Star,
      isActive: true,
      items: [
        {
          title: "Page 1",
          url: "#",
        },
        {
          title: "Page 2",
          url: "#",
        },
        {
          title: "Page 3",
          url: "#",
        },
      ],
    },
    {
      title: "Hobby 2",
      url: "#",
      icon: Sparkle,
      items: [
        {
          title: "Page 1",
          url: "#",
        },
      ],
    },
    {
      title: "Hobby 3",
      url: "#",
      icon: Sparkles,
      items: [
        {
          title: "Page 1",
          url: "#",
        },
        {
          title: "Page 2",
          url: "#",
        },
        
      ],
    },
  ],
  /*projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],*/
  navFooter: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (

      <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Hobbies</SidebarGroupLabel>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavMain items={data.navFooter} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    
  )
}
