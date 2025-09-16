import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings, Bot, History, CreditCard } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "AI Tools",
        url: "/ai-tools",
        icon: Bot,
    },
    {
        title: "My History",
        url: "/my-history",
        icon: History,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: Settings,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'/logo.png'} alt='logo' width={100} height={50}
                        className='w-full' />
                    <h2 className='text-sm text-gray-400 text-center'>Shape your future</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => {
                                const isActive = path === item.url || path.startsWith(item.url + "/");
                                return (
                                    <a
                                        href={item.url}
                                        key={index}
                                        className={`p-2 text-lg flex gap-2 items-center rounded-lg
                                            ${
                                              isActive
                                                ? "bg-gray-100 dark:bg-[#232946] text-blue-700 dark:text-blue-300"
                                                : ""
                                            }
                                            hover:bg-gray-100 dark:hover:bg-[#232946] transition-colors
                                        `}
                                    >
                                        <item.icon className='h-5 w-5' />
                                        <span>{item.title}</span>
                                    </a>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
            
            </SidebarFooter>
        </Sidebar>
    )
}