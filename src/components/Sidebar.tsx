"use client";
import {usePathname, useRouter} from 'next/navigation';
import {categories} from '@/lib/categories';
import {
    LayoutGrid, Layers, Mail, ShoppingBag,
    Calendar, MessageSquare, Users, FolderOpen, CheckSquare, Newspaper,
    FileText, CalendarDays, AlertTriangle, Briefcase, Clock, User,
    type LucideIcon,
} from "lucide-react";

type NavItem = {
    name: string;
    icon: LucideIcon;
    href?: string;
};

type NavGroup = {
    label: string;
    items: NavItem[];
};

const groups: NavGroup[] = [
    {
        label: "Navigations",
        items: categories.map(({label, slug}, index) => ({
            name: label,
            icon: [LayoutGrid, Layers, Mail, ShoppingBag][index],
            href: `/category/${slug}`,
        })),
    },
    {
        label: "Apps",
        items: [
            {name: "Calendar", icon: Calendar},
            {name: "Messanger", icon: MessageSquare},
            {name: "Contacts", icon: Users},
            {name: "File Manager", icon: FolderOpen},
            {name: "To-Do", icon: CheckSquare},
            {name: "News Feed", icon: Newspaper},
        ],
    },
    {
        label: "Pages",
        items: [
            {name: "Invoices", icon: FileText},
            {name: "Events", icon: CalendarDays},
            {name: "404 Page", icon: AlertTriangle},
            {name: "Projects", icon: Briefcase},
            {name: "Coming Soon", icon: Clock},
            {name: "Profile", icon: User},
        ],
    },
];

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

export default function Sidebar({
                                    open,
                                    onClose,
                                }: SidebarProps) {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                    zIndex: 40,
                }}/>
            <aside
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,

                    width: 248,
                    minHeight: '100vh',

                    transform: open
                        ? 'translateX(0)'
                        : 'translateX(-100%)',

                    transition: 'transform 0.3s ease',

                    background: '#161b22',
                    borderRight: '1px solid #21262d',

                    display: 'flex',
                    flexDirection: 'column',

                    zIndex: 50,
                }}
            >
                {/* Brand header */}
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "0 22px",
                        background: "linear-gradient(135deg,#7b5cff,#9d7bff)",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "#fff",
                            fontSize: 16,
                        }}
                    >
                        G
                    </div>
                    <span style={{color: "#fff", fontWeight: 600, fontSize: 19, letterSpacing: ".3px"}}>
                        TwinsTech
                    </span>
                </div>

                {/* Nav groups */}
                <nav style={{flex: 1, overflowY: "auto", padding: "14px 0"}}>
                    {groups.map((group) => (
                        <div key={group.label} style={{marginBottom: 8}}>
                            <div
                                style={{
                                    padding: "12px 24px 6px",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: "1.5px",
                                    textTransform: "uppercase",
                                    color: "#5c6573",
                                }}
                            >
                                {group.label}
                            </div>
                            {group.items.map(({name, icon: Icon, href}) => {
                                const isActive = href === pathname;
                                return (
                                    <button
                                        key={name}
                                        onClick={() => {
                                            if (href) router.push(href);
                                            onClose();
                                        }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                            width: "100%",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "11px 24px",
                                            fontSize: 14.5,
                                            textAlign: "left",
                                            transition: "background .18s ease, color .18s ease, border-color .18s ease",
                                            borderLeft: `3px solid ${isActive ? "#7b5cff" : "transparent"}`,
                                            background: isActive ? "rgba(123,92,255,.14)" : "transparent",
                                            color: isActive ? "#b9a4ff" : "#aab1bd",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "rgba(123,92,255,.08)";
                                                e.currentTarget.style.color = "#e6e9ef";
                                                e.currentTarget.style.borderLeftColor = "#7b5cff66";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "transparent";
                                                e.currentTarget.style.color = "#aab1bd";
                                                e.currentTarget.style.borderLeftColor = "transparent";
                                            }
                                        }}
                                    >
                                        <Icon size={18} strokeWidth={2}/>
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}
