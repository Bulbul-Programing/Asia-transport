""

import { NavSection } from "@/types/Dashboard/dashboardNavItem";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "ADMIN"],
                },
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER", "ADMIN"],
                },
                {
                    title: "Home",
                    href: "/",
                    icon: "Home", // ✅ String
                    roles: ["USER", "ADMIN"],
                }
            ]
        }
    ]
}

export const getUserNavItem = async (): Promise<NavSection[]> => {

    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    href: "/user/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["USER"],
                }
            ],
        }
    ];
}

export const adminNavItems: NavSection[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Dashboard",
                href: "/admin/dashboard",
                icon: "LayoutDashboard",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Users",
                href: "/admin/dashboard/userManagement",
                icon: "User",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "TR Management",
        items: [
            {
                title: "TR",
                href: "/admin/dashboard/tr",
                icon: "Layers",
                roles: ["ADMIN"],
            },
            {
                title: "Daily Calculation",
                href: "/admin/dashboard/dailyCalculation",
                icon: "DollarSign",
                roles: ["ADMIN"],
            },
        ]
    }
]

export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...adminNavItems, ...commonNavItems,];
        case "USER":
            return [...await getUserNavItem(), ...commonNavItems];
        default:
            return [];
    }
}