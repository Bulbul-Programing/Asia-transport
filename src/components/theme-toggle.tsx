"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    if (!resolvedTheme) return null;

    return (
        <div className="border-2 border-foreground/30 rounded-full">
            <Toggle
                variant="outline"
                className="group border-2 size-8 cursor-pointer rounded-full border-none shadow-none
                           bg-transparent! hover:bg-transparent! focus:bg-transparent! active:bg-transparent!"
                pressed={resolvedTheme === "dark"}
                onPressedChange={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            >
                <MoonIcon
                    size={16}
                    className={`transition-all ${resolvedTheme === "dark"
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }`}
                />

                <SunIcon
                    size={16}
                    className={`absolute transition-all ${resolvedTheme === "dark"
                            ? "scale-0 opacity-0"
                            : "scale-100 opacity-100"
                        }`}
                />
            </Toggle>
        </div>
    );
}