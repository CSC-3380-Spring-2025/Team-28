"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSidebar = AppSidebar;
const React = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const nav_main_1 = require("@/components/nav-main");
const nav_user_1 = require("@/components/nav-user");
const sidebar_1 = require("@/components/ui/sidebar");
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
            icon: lucide_react_1.Star,
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
            icon: lucide_react_1.Sparkle,
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
            icon: lucide_react_1.Sparkles,
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
            icon: lucide_react_1.House
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: lucide_react_1.Settings
        }
    ]
};
function AppSidebar(_a) {
    var props = __rest(_a, []);
    return (<sidebar_1.Sidebar collapsible="offcanvas" {...props}>
      <sidebar_1.SidebarHeader>
        <nav_user_1.NavUser user={data.user}/>
      </sidebar_1.SidebarHeader>
      <sidebar_1.SidebarContent>
        <sidebar_1.SidebarGroupLabel>Hobbies</sidebar_1.SidebarGroupLabel>
        <nav_main_1.NavMain items={data.navMain}/>
      </sidebar_1.SidebarContent>
      <sidebar_1.SidebarFooter>
        <nav_main_1.NavMain items={data.navFooter}/>
      </sidebar_1.SidebarFooter>
      <sidebar_1.SidebarRail />
    </sidebar_1.Sidebar>);
}
