"use client"
//find user w/ an API, fetch their hobbies and path, put said information into here
import * as React from "react"
import {
  House,
  Settings,
  Sparkle,
  Sparkles,
  Star,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [name, setName] = useState('')
  const [hobbies, setHobbies] = useState<any[]>([])
  const [pages1, setPages1] = useState<any[]>([])
  const [pages2, setPages2] = useState<any[]>([])
  const [pages3, setPages3] = useState<any[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try{
        const response = await axios.get('/api/populateNavBar')
        setName(response.data.name)
        setHobbies(response.data.hobbies)
        setPages1(response.data.pages1)
        setPages2(response.data.pages2)
        setPages3(response.data.pages3)
        console.log(response)
      } catch(err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [])


  const data = {
    user: {
      name: "Welcome, " + name,
      email: process.env.LOGGED_IN_USER!,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: hobbies[0],
        url: "#",
        icon: Star,
        isActive: true,
        items: [
          {
            title: "Blog",
            url: pages1[0],
          },
          {
            title: "Collections",
            url: pages1[1],
          },
          {
            title: "Supplies",
            url: pages1[2],
          },
        ],
      },
      {
        title: hobbies[1],
        url: "#",
        icon: Sparkle,
        items: [
          {
            title: "Blog",
            url: pages2[0],
          },
          {
            title: "Collections",
            url: pages2[1],
          },
          {
            title: "Supplies",
            url: pages2[2],
          },
        ],
      },
      {
        title: hobbies[2],
        url: "#",
        icon: Sparkles,
        items: [
          {
            title: "Blog",
            url: pages3[0],
          },
          {
            title: "Collections",
            url: pages3[0],
          },
          {
            title: "Supplies",
            url: pages3[0],
          },
        ],
      },
    ],
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
