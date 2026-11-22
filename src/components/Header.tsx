'use client';

import {useState} from 'react';
import Sidebar from '@/components/Sidebar';
import {
    Menu,
    Search,
    Phone,
    User,
    Heart,
    ShoppingBag,
    ChevronDown,
} from 'lucide-react';

export function Header() {
    const [open, setOpen] = useState(false);

    const menuItems = [
        'Home',
        'Shop',
        'Product',
        'Sales',
        'Mega Menu',
        'Pages',
        'Seller',
        'Blog',
    ];

    return (
        <>
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 30,
                    width: '100%',
                    background: '#161b22',
                    borderBottom: '1px solid #21262d',
                    fontFamily: "'Outfit', system-ui, sans-serif",
                }}
            >
                {/* Top Bar */}
                <div
                    style={{
                        maxWidth: '1400px',
                        height: '98px',
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 24px',
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            fontSize: '34px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ color: '#7b5cff' }}>Twins</span>
                        <span style={{ color: '#b9a4ff' }}>Tech</span>
                    </div>

                    {/* Search */}
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            maxWidth: '950px',
                            margin: '0 60px',
                            height: '64px',
                        }}
                    >
                        <select
                            style={{
                                width: '180px',
                                background: '#0d1117',
                                color: '#e6e9ef',
                                border: '1px solid #21262d',
                                borderRight: 'none',
                                padding: '0 16px',
                            }}
                        >

                        <option>All Category</option>
                        </select>

                        <input
                            type="text"
                            placeholder="I'm searching for..."
                            style={{
                                flex: 1,
                                border: '1px solid #21262d',
                                background: '#0d1117',
                                color: '#e6e9ef',
                                padding: '0 20px',
                                outline: 'none',
                                fontSize: '15px',
                            }}
                        />

                        <button
                            style={{
                                width: '70px',
                                border: 'none',
                                background: 'linear-gradient(135deg,#7b5cff,#9d7bff)',
                                cursor: 'pointer',
                            }}
                        >
                            <Search size={22}/>
                        </button>
                    </div>

                    {/* Right Side */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                        }}
                    >
                        <Phone size={32} color="#aab1bd"/>

                        <div>
                            <div
                                style={{
                                    color: '#6b7280',
                                    fontSize: '14px',
                                }}
                            >
                                Call us now
                            </div>

                            <div
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    color: '#e6e9ef',
                                }}
                            >
                                077 - 315 - 6323
                            </div>
                        </div>

                        <User
                            size={28}
                            color="#aab1bd"
                            style={{cursor: 'pointer'}}
                        />

                        <div
                            style={{
                                position: 'relative',
                                cursor: 'pointer',
                            }}
                        >
                            <Heart size={28} color="#aab1bd"/>

                            <span
                                style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: '#ef4444',
                                    color: '#ffffff',
                                    fontSize: '11px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                3
              </span>
                        </div>

                        <ShoppingBag
                            size={28}
                            color="#aab1bd"
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div
                    style={{
                        borderTop: '1px solid #21262d',
                        height: '72px',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1400px',
                            margin: '0 auto',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 24px',
                        }}
                    >
                        {/* Categories Button */}
                        <button
                            onClick={() => setOpen(true)}
                            style={{
                                height: '60px',
                                padding: '0 24px',
                                border: 'none',
                                background: 'linear-gradient(135deg,#7b5cff,#9d7bff)',
                                color: '#ffffff',
                                fontSize: '16px',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            <Menu size={22}/>
                            Shop By Categories
                        </button>

                        {/* Menu */}
                        <nav
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '36px',
                                marginLeft: '40px',
                                color: '#aab1bd',
                            }}
                        >
                            {menuItems.map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                    }}
                                >
                                    {item}
                                    <ChevronDown size={15}/>
                                </div>
                            ))}
                        </nav>

                        <div
                            style={{
                                marginLeft: 'auto',
                                fontSize: '16px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            Order Tracking
                        </div>
                    </div>
                </div>
            </header>

            <Sidebar
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
