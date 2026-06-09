"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RoleBadgeCellProps {
    role: "mp" | "user" | "admin" | string;
}

const roleClassMap: Record<string, string> = {
    admin:
        "bg-destructive text-white hover:bg-destructive",
    mp:
        "bg-primary text-primary-foreground hover:bg-primary",
    user:
        "bg-secondary text-secondary-foreground hover:bg-secondary",
};

export function RoleBadgeCell({ role }: RoleBadgeCellProps) {
    const roleLower = role.toLowerCase();

    return (
        <Badge
            className={cn(
                "uppercase font-medium",
                roleClassMap[roleLower] ?? "bg-muted text-muted-foreground"
            )}
        >
            {role}
        </Badge>
    );
}
