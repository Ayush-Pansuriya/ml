'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="navbar-brand" onClick={closeMenu}>
                    <div className="navbar-logo-icon">🧠</div>
                    <span className="navbar-title">LoanSense AI</span>
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                        📈 Dashboard
                    </Link>
                    <Link href="/predict" className={`nav-link ${pathname === '/predict' ? 'active' : ''}`} onClick={closeMenu}>
                        🎯 Predict
                    </Link>
                    <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>
                        📊 Model Info
                    </Link>
                </div>
            </div>
        </nav>
    );
}
