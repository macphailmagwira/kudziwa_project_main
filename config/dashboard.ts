import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/dashboard",
        icon: "dashboard",
        title: "Dashboard",
        authorizeOnly: UserRole.ADMIN,
      },
        {
        href: "/dashboard/datasets",
        icon: "database",
        title: "Data Sources",
        authorizeOnly: UserRole.ADMIN,
      },
     // { href: "/dashboard", icon: "dashboard", title: "Dashboard" },

      {
        href: "/dashboard/reports",
        icon: "report",
        title: "Reports",
        authorizeOnly: UserRole.ADMIN,
      },
     // { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
     /* {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },*/
     
     /* {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },*/
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "info", title: "About" },
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/dashboard/settings", icon: "message", title: "Feedback" },
     // { href: "/", icon: "home", title: "Homepage" },
      /*{ href: "/docs", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.ADMIN,
        disabled: true,
      }*/
    ],
  },
];
