'use client'
import { navigationLinks } from './Navbar';
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';

const SmallDeviceNavigation = () => {
    const pathName = usePathname()
    return (
        <>
            <>
                {navigationLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                        <NavigationMenuItem key={index} className="w-full">
                            <NavigationMenuLink
                                href={link.href}
                                className={`${pathName === link.href && 'bg-sidebar-accent'} flex-row items-center gap-2 py-1.5`}
                                active={link.active}
                            >
                                <Icon
                                    size={16}
                                    className="text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <span>{link.label}</span>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )
                })}
            </>
        </>
    );
};

export default SmallDeviceNavigation;