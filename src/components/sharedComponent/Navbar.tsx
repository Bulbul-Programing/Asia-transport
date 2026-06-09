import Link from 'next/link';
import React from 'react';
import Logo from './Logo';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';
import { HomeIcon, HandCoins, UserIcon, FolderKanban} from 'lucide-react';
import SmallDeviceNavigation from './SmallDeviceNavigation';
import LargeDeviceNavigation from './LargeDeviceNavigation';
import { getCookie } from '@/service/Auth/tokenHandlers';
import { getUserInfo } from '@/service/Auth/getUserInfo';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { FaRegMoneyBill1 } from "react-icons/fa6"
import { MdOutlineReport } from "react-icons/md";
import ThemeToggle from '../theme-toggle';
import UserMenu from '../userMenu';

export const navigationLinks = [
    { href: "/", label: "Home", icon: HomeIcon, active: true },
    { href: "/projects", label: "Projects", icon: FolderKanban, active: true },
    { href: "/allowances", label: "Allowances", icon: HandCoins, active: true },
    { href: "/accounts", label: "Accounts", icon: FaRegMoneyBill1, active: true },
    { href: "/complain", label: "Complain", icon: MdOutlineReport, active: true },
    { href: "/aboutUs", label: "About us", icon: UserIcon },
]

const Navbar = async () => {
    const accessToken = await getCookie("accessToken");
    const userInfo = accessToken ? await getUserInfo() : null;
    const dashboardRoute = userInfo
        ? getDefaultDashboardRoute(userInfo.role)
        : "/";
    return (
        <div className="">
            <header className=" border-b-2 border-secondary backdrop-blur-lg md:px-2 lg:px-6  w-full">
                <div className="flex bg-transparent h-16 items-center justify-between gap-4">
                    {/* Left side */}
                    <div className='flex items-center'>
                        <div className="flex items-center gap-2">
                            {/* Mobile menu trigger */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="group size-8 lg:hidden"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <svg
                                            className="pointer-events-none"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4 12L20 12"
                                                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                            />
                                            <path
                                                d="M4 12H20"
                                                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                            />
                                            <path
                                                d="M4 12H20"
                                                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                            />
                                        </svg>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-36 p-1 lg:hidden">
                                    <NavigationMenu className="max-w-none *:w-full">
                                        <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                            <SmallDeviceNavigation />
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </PopoverContent>
                            </Popover>
                            <div className="flex items-center gap-6">
                                {/* Logo */}
                                <Link className='flex items-center' href='/'>
                                    <Logo />
                                    <h3 className='text-xl md:text-lg lg:text-xl text-primary font-bold'>Asia Transport</h3>
                                </Link>
                                {/* Desktop navigation - icon only */}

                            </div>
                        </div>
                        <div className=" px-5 py-2 rounded-full">
                            <NavigationMenu className="hidden lg:flex">
                                <NavigationMenuList className="gap-2">
                                    <LargeDeviceNavigation />
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <ThemeToggle />
                        <UserMenu
                            initialHasToken={!!accessToken}
                            initialUserInfo={userInfo}
                            initialDashboardRoute={dashboardRoute}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;