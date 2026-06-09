'use client'
import React from 'react';
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navigationLinks } from './Navbar';

const LargeDeviceNavigation = () => {
    const pathName = usePathname()
    return (
        <>
            {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                        asChild
                        className={`${pathName === link.href ? 'text-primary transition ' : ''} hover:text-primary/75 hover:bg-primary/20 flex items-center justify-center`}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
        </>
    );
};

export default LargeDeviceNavigation;