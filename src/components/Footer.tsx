'use client';

import {
    Phone,
    Mail,
    MapPin,
} from 'lucide-react';

export default function Footer() {
    return (
        <footer
            style={{
                background: '#161b22',
                color: '#aab1bd',
                fontFamily: "'Outfit', system-ui, sans-serif",
                marginTop: '80px',
                borderTop: '1px solid #21262d',
            }}
        >
            {/* Main Footer */}
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '80px 24px',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '80px',

                    borderLeft: '1px solid #21262d',
                    borderRight: '1px solid #21262d',
                }}
            >
                {/* Company */}
                <div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '40px',
                        }}
                    >
                        <div
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background:
                                    'linear-gradient(135deg,#7b5cff,#9d7bff)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '18px',
                            }}
                        >
                            T
                        </div>

                        <h2
                            style={{
                                color: '#e6e9ef',
                                fontSize: '30px',
                                margin: 0,
                            }}
                        >
                            TwinsTech
                        </h2>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '14px',
                                alignItems: 'center',
                            }}
                        >
                            <Phone size={18} color="#7b5cff"/>
                            <span>+94 77 123 4567</span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                gap: '14px',
                                alignItems: 'center',
                            }}
                        >
                            <Mail size={18} color="#7b5cff"/>
                            <span>info@twinstech.lk</span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                gap: '14px',
                                alignItems: 'flex-start',
                            }}
                        >
                            <MapPin
                                size={18}
                                color="#7b5cff"
                                style={{marginTop: '4px'}}
                            />
                            <span>
                TwinsTech ERP Solutions,
                <br/>
                Colombo, Sri Lanka
              </span>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h3
                        style={{
                            color: '#e6e9ef',
                            fontSize: '22px',
                            marginBottom: '28px',
                        }}
                    >
                        Products
                    </h3>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '18px',
                        }}
                    >
                        <span>ERP System</span>
                        <span>CRM Platform</span>
                        <span>Inventory Module</span>
                        <span>HRM Solution</span>
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h3
                        style={{
                            color: '#e6e9ef',
                            fontSize: '22px',
                            marginBottom: '28px',
                        }}
                    >
                        Services
                    </h3>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '18px',
                        }}
                    >
                        <span>Consulting</span>
                        <span>Implementation</span>
                        <span>Support</span>
                        <span>Track Order</span>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3
                        style={{
                            color: '#e6e9ef',
                            fontSize: '22px',
                            marginBottom: '28px',
                        }}
                    >
                        Company
                    </h3>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '18px',
                        }}
                    >
                        <span>About Us</span>
                        <span>Careers</span>
                        <span>Blog</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    borderTop: '1px solid #21262d',
                    background: '#111827',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                }}
            >
                <div
                    style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        minHeight: '80px',
                        padding: '0 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            color: '#aab1bd',
                            fontSize: '15px',
                        }}
                    >
                        © Copyright 2026 - TwinsTech.
                        All Rights Reserved.
                    </div>

                    {/* Payment */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                            color: '#7b5cff',
                            fontWeight: 600,
                        }}
                    >
                        <span>VISA</span>
                        <span>PayPal</span>
                        <span>MasterCard</span>
                    </div>

                    {/* Social */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '18px',
                        }}
                    >
                        {/*<Facebook*/}
                        {/*    color="#aab1bd"*/}
                        {/*    size={22}*/}
                        {/*    style={{ cursor: 'pointer' }}*/}
                        {/*/>*/}

                        {/*<Instagram*/}
                        {/*    color="#aab1bd"*/}
                        {/*    size={22}*/}
                        {/*    style={{ cursor: 'pointer' }}*/}
                        {/*/>*/}

                        {/*<Linkedin*/}
                        {/*    color="#aab1bd"*/}
                        {/*    size={22}*/}
                        {/*    style={{ cursor: 'pointer' }}*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        </footer>
    );
}
